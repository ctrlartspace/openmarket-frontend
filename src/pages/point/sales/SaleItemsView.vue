<template>
  <a-page :loading="isLoading" title="Продажи">
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>
    </template>
    <div v-if="sales && sales.length > 0" class="flex flex-col gap-2">
      <daily-sales-chart :sales="sales" />
      <div v-for="data in groupedDataByDate" :key="data.date">
        <h1 class="mb-2 px-4 text-gray-300 dark:text-neutral-600">
          {{ fromNow(data.date) }}
        </h1>
        <a-list
          :items="data.items"
          class="mb-4"
          description-field="totalCount"
          description-hint="шт."
          title-field="summaryTitle"
        >
          <template #title="{ item }">
            <span v-if="item.items && item.items.length > 0">
              {{ getSummaryTitle(item) }}
            </span>
            <span v-else>
              {{ item.comment || "" }}
              <span>Свободная продажа</span>
            </span>
          </template>
          <template #description="{ item }">
            <span class="font-medium">
              {{ formatMoney(getTotalPrice(item)) }}
            </span>
            <span class="font-semibold"> ₸ </span>
          </template>
          <template #sub="{ item }">
            <div
              class="flex justify-between text-gray-300 dark:text-neutral-600"
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
    </div>
    <div v-else>
      <h1
        class="rounded-xl bg-gray-50 px-4 py-3 text-center text-gray-300 dark:bg-neutral-900 dark:text-neutral-600"
      >
        Нет продаж
      </h1>
    </div>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatDate, fromNow } from "@/utils/format-date"
import { formatPaymentType } from "@/utils/format-payment-type"
import { formatMoney } from "@/utils/format-money"
import DailySalesChart from "@/components/ui/DailySalesChart.vue"

const { serverData: sales, sendRequest, isLoading } = useApiRequest()

// Группировка данных по дате
const groupedDataByDate = computed(() => {
  const groupedData = {}
  sales.value.forEach((item) => {
    const date = item.createdAt.split("T")[0]
    if (groupedData[date]) {
      groupedData[date].items.push(item)
    } else {
      groupedData[date] = {
        date: date,
        items: [item],
      }
    }
  })
  return Object.values(groupedData)
})

// Вычисление заголовка для продажи
const getSummaryTitle = (sale) => {
  const items = sale.items || []
  if (items.length === 0) return "Свободная продажа"
  const firstItem = items[0].pointItem
  const remainingCount = items.length - 1
  const firstName = firstItem ? firstItem.name : "Свободная продажа"
  return remainingCount > 0 ? `${firstName} и еще ${remainingCount}` : firstName
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

onMounted(async () => {
  await sendRequest("get", "/point/sales")
})
</script>

<style lang="scss" scoped></style>
