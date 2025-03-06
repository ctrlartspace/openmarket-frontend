<template>
  <a-page :loading="isLoading" title="Поступления">
    <template v-if="store.hasPermission('create_arrival')" #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>

      <Button as="router-link" fluid to="/point/arrivals/add">
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Создать</span>
      </Button>
    </template>
    <template v-if="store.hasPermission('create_arrival')" #floating>
      <a-link-floating-text black solid to="/point/arrivals/add">
        Новое поступление
      </a-link-floating-text>
    </template>

    <div
      v-if="groupedDataByDate && groupedDataByDate.length > 0"
      class="flex flex-col gap-2"
    >
      <div v-for="data in groupedDataByDate" :key="data.date">
        <h1 class="mb-2 px-4 text-gray-300 dark:text-neutral-600">
          {{ formatDateHeader(data.date) }}
        </h1>
        <a-list
          :items="data.items"
          class="mb-4"
          description-field="totalCount"
          description-hint="шт."
          title-field="summaryTitle"
          @on-item-click="onItemClick"
        >
          <template #title="{ item }">
            <span>{{ getSummaryTitle(item) }}</span>
          </template>
          <template #description="{ item }">
            <span class="font-medium">{{ getTotalCount(item) }} шт.</span>
          </template>
          <template #sub="{ item }">
            <div class="text-gray-300 dark:text-neutral-600">
              <span>{{ formatDate(item.createdAt, "HH:mm") }}</span>
              <span v-if="item.comment" class="ml-2">— {{ item.comment }}</span>
            </div>
          </template>
        </a-list>
      </div>
    </div>

    <div
      v-else-if="!isLoading"
      class="rounded-xl bg-gray-50 px-4 py-3 text-center text-gray-300 dark:bg-neutral-900 dark:text-neutral-600"
    >
      Нет поступлений
    </div>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"
import { useUserStore } from "@/stores/user.store.js"
import { formatDate, fromNow } from "@/utils/format-date"

const router = useRouter()
const { serverData: arrivals, sendRequest, isLoading } = useApiRequest()
const store = useUserStore()

// Группировка поступлений по датам
const groupedDataByDate = computed(() => {
  if (!arrivals.value || arrivals.value.length === 0) return []

  const groupedData = {}
  arrivals.value.forEach((item) => {
    const date = item.createdAt.split("T")[0] // Берем только дату (YYYY-MM-DD)
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

// Форматирование заголовка с учетом 3 дней
const formatDateHeader = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (daysDiff > 3) {
    return formatDate(dateStr, "DD.MM.YYYY") // Полная дата, если больше 3 дней
  }
  return fromNow(dateStr) // "Сегодня", "Вчера" и т.д., если 3 дня или меньше
}

// Вычисление заголовка для поступления
const getSummaryTitle = (arrival) => {
  const items = arrival.items || []
  if (items.length === 0) return "Поступление без товаров"
  const firstItem = items[0].pointItem
  const remainingCount = items.length - 1
  const firstName = firstItem ? firstItem.name : "Неизвестный товар"
  return remainingCount > 0
    ? `${firstName} и еще ${remainingCount} товара`
    : firstName
}

// Вычисление общего количества товаров
const getTotalCount = (arrival) => {
  return arrival.items.reduce((total, item) => total + item.count, 0)
}

// Переход к деталям (опционально)
const onItemClick = (item) => {}

onMounted(async () => {
  await sendRequest("get", "/point/arrivals")
})
</script>

<style lang="scss" scoped></style>
