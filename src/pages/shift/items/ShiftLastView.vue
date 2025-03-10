<template>
  <a-page :loading="isWorkShiftLoading" :title="getCashTitle">
    <template #header>
      <a-modal
        v-if="isWorkShiftOpen && !isWorkShiftLoading"
        #="{ props }"
        :async-operation="closeActiveCashRegister"
        title="Закрыть смену?"
      >
        <Button fluid severity="danger" v-bind="props">
          <span class="material-symbols-rounded">close</span>
          <span class="font-medium"> Закрыть смену</span>
        </Button>
      </a-modal>
      <Button
        v-if="!isWorkShiftOpen && !isWorkShiftLoading"
        as="router-link"
        fluid
        severity="help"
        to="/work-shifts/add"
      >
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Открыть смену</span>
      </Button>
    </template>
    <template #floating>
      <a-modal
        v-if="isWorkShiftOpen"
        #="{ props }"
        :async-operation="closeActiveCashRegister"
        title="Закрыть смену?"
      >
        <a-button-floating-text black solid v-bind="props">
          Закрыть смену
        </a-button-floating-text>
      </a-modal>
      <a-link-floating-text
        v-if="!isWorkShiftOpen && !isWorkShiftLoading"
        primary
        to="/work-shifts/add"
      >
        Открыть смену
      </a-link-floating-text>
    </template>

    <div v-if="isWorkShiftOpen" class="flex flex-col gap-4">
      <div class="rounded-xl bg-white p-4 dark:bg-neutral-900">
        <span class="text-black dark:text-neutral-200">
          {{ workShift.point.name }}
        </span>
        <p class="text-gray-300 dark:text-neutral-600">
          <span>
            {{
              formatDate(workShift.createdAt, " HH:mm") +
              ", " +
              fromNow(workShift.createdAt) +
              ", "
            }}
          </span>
          <span class=""> {{ workShift.user.fullName }}</span>
        </p>
        <hourly-sales-chart
          v-if="workShift.sales.length > 1"
          :sales="workShift.sales"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col rounded-xl bg-white p-4 dark:bg-neutral-900">
          <span class="text-black dark:text-neutral-200">Итого</span>
          <span class="font-medium text-blue-600 dark:text-blue-400">
            {{ formatMoney(workShift.total) }}
            <span class="font-semibold">₸</span>
          </span>
        </div>
        <div class="flex flex-col rounded-xl bg-white p-4 dark:bg-neutral-900">
          <span class="text-black dark:text-neutral-200">На кассе</span>
          <span class="font-medium text-black dark:text-neutral-400">
            {{ formatMoney(cashAmount) }}
            <span class="font-semibold">₸</span>
          </span>
        </div>
      </div>

      <a-list
        :items="workShift.totalsPaymentType"
        description-field="total"
        description-hint="₸"
        title-field="paymentType"
      >
        <template #title="{ item }">
          <span class="">
            {{ formatPaymentType(item.paymentType) }}
          </span>
        </template>
        <template #description="{ item }">
          <span class="font-medium">
            {{ formatMoney(item.total) }}
            <span class="font-semibold">₸</span>
          </span>
        </template>
      </a-list>

      <div>
        <h1 class="mb-2 px-4 text-gray-400 dark:text-neutral-600">
          История продаж
        </h1>
        <a-list
          :items="workShift.sales"
          description-field="totalCount"
          description-hint="шт."
          sort-field="updatedAt"
          sort-order="desc"
          title-field="summaryTitle"
        >
          <template #title="{ item }">
            <span v-if="item.items && item.items.length > 0">
              {{ getSummaryTitle(item) }}
            </span>
            <span v-else>
              {{ item.comment || "" }}
              <span class="rounded font-normal text-yellow-500"
                >Свободная продажа</span
              >
            </span>
          </template>
          <template #description="{ item }">
            <span class="font-medium">
              <span
                v-if="item.discount > 0"
                class="mr-2 rounded bg-rose-50 px-2 py-1 text-rose-500 dark:bg-rose-500/20 dark:text-rose-200"
              >
                -{{ formatMoney(getDiscountAmount(item)) }}
                <span class="font-semibold">₸</span>
              </span>
              <span>
                {{ formatMoney(getTotalPrice(item)) }}
              </span>
            </span>
            <span class="font-semibold"> ₸ </span>
          </template>
          <template #sub="{ item }">
            <div
              class="flex justify-between text-gray-300 dark:text-neutral-500"
            >
              <div>
                <span>{{ formatDate(item.createdAt, "HH:mm") + ", " }}</span>
                <span>{{ formatPaymentType(item.paymentType) }}</span>
              </div>
              <span>{{ getTotalCount(item) }} шт.</span>
            </div>
          </template>
        </a-list>
      </div>

      <div>
        <a-list :items="menuItems" title-field="title">
          <template #title="{ item }">
            <router-link :to="item.path" class="flex items-center gap-4">
              <span class="material-symbols-rounded">{{ item.icon }}</span>
              <span class="font-medium">
                {{ item.title }}
              </span>
              <span class="material-symbols-rounded ml-auto"
                >chevron_right</span
              >
            </router-link>
          </template>
        </a-list>
      </div>
    </div>
    <div v-else class="">
      <div
        v-if="!isWorkShiftLoading"
        class="rounded-xl bg-gray-50 px-4 py-3 text-center dark:bg-neutral-900"
      >
        <span class="text-gray-300 dark:text-neutral-600"
          >Смена не найдена</span
        >
      </div>
    </div>
  </a-page>
</template>

<script setup>
import ALinkFloatingText from "@/components/ui/ALinkFloatingText.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import AList from "@/components/ui/AList.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatDate, fromNow } from "@/utils/format-date"
import { formatMoney } from "@/utils/format-money"
import { useUserStore } from "@/stores/user.store.js"
import HourlySalesChart from "@/components/ui/HourlySalesChart.vue"

const {
  serverData: workShift,
  sendRequest: fetchWorkShift,
  isLoading: isWorkShiftLoading,
} = useApiRequest()
const { sendRequest: closeActiveCash } = useApiRequest()
const store = useUserStore()

const getCashTitle = computed(() => {
  if (isWorkShiftOpen.value) {
    return "Смена #" + workShift.value.id
  }
  return ""
})

const closeActiveCashRegister = async () => {
  if (isWorkShiftOpen.value) {
    await closeActiveCash("put", "/point/work-shifts/" + workShift.value.id, {
      isClosed: true,
    })
    await fetchWorkShift("get", "/point/work-shifts/today")
  }
}

const isWorkShiftOpen = computed(
  () => !!(workShift.value && workShift.value.id),
)

const totalWorkShiftAmount = computed(
  () =>
    workShift.value.totalsPaymentType.find((item) => item.paymentType === 1)
      ?.total || 0,
)

const cashAmount = computed(
  () => workShift.value.startAmount + totalWorkShiftAmount.value,
)

// Вычисление заголовка для продажи
const getSummaryTitle = (sale) => {
  const items = sale.items || []
  if (items.length === 0) return "Свободная продажа"
  const firstItem = items[0].pointItem
  const remainingCount = items.length - 1
  const firstName = firstItem ? firstItem.name : "Свободная продажа"
  return remainingCount > 0
    ? `${firstName} и еще ${remainingCount} `
    : firstName
}

// Вычисление общей цены продажи
const getTotalPrice = (sale) => {
  return sale.items.reduce(
    (total, item) => total + item.sellingPrice * item.count,
    0,
  )
}

// Вычисление общего количества товаров
const getTotalCount = (sale) => {
  return sale.items.reduce((total, item) => total + item.count, 0)
}

// Вычисление суммы скидки
const getDiscountAmount = (sale) => {
  if (!sale.discount) return 0
  const originalTotal = sale.items.reduce((total, item) => {
    const pointItem = item.pointItem
    const originalPrice = pointItem ? pointItem.sellingPrice : item.sellingPrice
    return total + originalPrice * item.count
  }, 0)
  return originalTotal - getTotalPrice(sale)
}

const formatPaymentType = (paymentType) => {
  const types = {
    1: "Наличный расчет",
    2: "Безналичный расчет",
  }
  return types[paymentType] || "Другое"
}

const menuItems = computed(() =>
  [
    {
      title: "Предыдущие смены",
      icon: "history",
      path: "/work-shifts/archive",
      permission: "view_shifts",
    },
  ].filter((item) => store.hasPermission(item.permission)),
)

onMounted(async () => {
  await fetchWorkShift("get", "/point/work-shifts/today")
  console.log(workShift.value.sales)
})
</script>

<style lang="scss" scoped></style>
