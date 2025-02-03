<template>
  <a-page :loading="isActiveCashLoading" :title="getCashTitle">
    <template #header>
      <a-modal
        v-if="isActiveCashExists"
        #="{ props }"
        :async-operation="closeActiveCashRegister"
        title="Закрыть смену?"
      >
        <a-button danger v-bind="props"> Закрыть смену</a-button>
      </a-modal>
      <a-link
        v-if="!isActiveCashExists"
        :loading="isActiveCashLoading"
        primary
        to="/work-shifts/add"
      >
        Открыть смену
      </a-link>
    </template>
    <template #floating>
      <a-modal
        v-if="isActiveCashExists"
        #="{ props }"
        :async-operation="closeActiveCashRegister"
        title="Закрыть смену?"
      >
        <a-button-floating-text danger to="/arrivals/items/add" v-bind="props">
          Закрыть смену
        </a-button-floating-text>
      </a-modal>
      <a-link-floating-text
        v-if="!isActiveCashExists && !isActiveCashLoading"
        primary
        to="/work-shifts/add"
      >
        Открыть смену
      </a-link-floating-text>
    </template>

    <div v-if="isActiveCashExists" class="flex flex-col gap-4">
      <div class="rounded-xl bg-white p-4">
        <span class="">
          {{ activeCash.point.name }}
        </span>
        <p class="text-gray-400">
          <span>
            {{
              formatDate(activeCash.createdAt, " HH:mm") +
              ", " +
              fromNow(activeCash.createdAt) +
              ", "
            }}
          </span>
          <span class=""> {{ activeCash.user.fullName }}</span>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col rounded-xl bg-white p-4">
          <span class="">Итого</span>
          <span class="font-medium text-blue-600">
            {{ formatMoney(activeCash.total) }}
            <span class="font-semibold">₸</span>
          </span>
        </div>
        <div class="flex flex-col rounded-xl bg-white p-4">
          <span class="">На кассе</span>
          <span class="font-medium">
            {{ formatMoney(cashAmount) }}
            <span class="font-semibold">₸</span>
          </span>
        </div>
      </div>

      <a-list
        :items="activeCash.totalsPaymentType"
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
          <span class="font-medium"
            >{{ formatMoney(item.total) }}
            <span class="font-semibold">₸</span>
          </span>
        </template>
      </a-list>
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <div
        v-if="!isActiveCashLoading"
        class="flex flex-col items-center justify-center rounded-xl p-4"
      >
        <span class="text-gray-300">Смена не найдена</span>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import AButton from "@/components/ui/AButton.vue"
import ALinkFloatingText from "@/components/ui/ALinkFloatingText.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import AList from "@/components/ui/AList.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatDate, fromNow } from "@/utils/format-date"
import { formatMoney } from "@/utils/format-money"

const {
  serverData: activeCash,
  sendRequest: fetchActiveCash,
  isLoading: isActiveCashLoading,
} = useApiRequest()
const { sendRequest: closeActiveCash } = useApiRequest()
// const {
//   serverData: hourlySales,
//   sendRequest: fetchHourlySales,
//   isLoading: isHourlySalesLoading,
// } = useApiRequest()

const getCashTitle = computed(() => {
  if (isActiveCashExists.value) {
    return "Смена #" + activeCash.value.id
  }
  return ""
})

const closeActiveCashRegister = async () => {
  if (isActiveCashExists.value) {
    await closeActiveCash("put", "/work-shifts/" + activeCash.value.id, {
      isClosed: true,
    })
    await fetchActiveCash("get", "/work-shifts/today")
  }
}

const isActiveCashExists = computed(
  () => !!(activeCash.value && activeCash.value.id),
)

const totalCashAmount = computed(
  () =>
    activeCash.value.totalsPaymentType.find(
      (item) => item.paymentType === "cash",
    )?.total || 0,
)

const cashAmount = computed(
  () => activeCash.value.startAmount + totalCashAmount.value,
)

const formatPaymentType = (paymentType) => {
  const types = {
    cash: "Наличные",
    kaspi_qr: "Kaspi QR",
    online: "Перевод",
  }

  return types[paymentType] || "Другое"
}

onMounted(async () => {
  await fetchActiveCash("get", "/point/work-shifts/today")
})
</script>

<style lang="scss" scoped></style>
