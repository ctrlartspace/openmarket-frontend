<template>
  <a-page :loading="isLoading" title="Продажи">
    <template #header>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        @click="$router.back()"
      >
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </button>
    </template>
    <div v-if="sales && sales.length > 0" class="flex flex-col gap-2">
      <div v-for="data in groupedDataByDate" :key="data.date">
        <h1 class="mb-2 px-4 text-gray-300">
          {{ fromNow(data.date) }}
        </h1>
        <a-list
          :items="data.items"
          class="mb-4"
          description-field="count"
          description-hint="шт."
          title-field="pointItem.name"
        >
          <template #title="{ item }">
            <span v-if="item.pointItem" class="">{{
              item.pointItem?.name
            }}</span>
            <span v-else class=""
              >{{ item.comment || "" }}
              <span class="">Свободная продажа</span></span
            >
          </template>
          <template #description="{ item }">
            <span class="font-medium">
              {{ formatMoney(item.count * item.sellingPrice) }}
            </span>
            <span class="font-semibold"> ₸ </span>
          </template>
          <template #sub="{ item }">
            <div class="flex justify-between text-gray-300">
              <div>
                <span>{{ formatDate(item.createdAt, "HH:mm") + ", " }}</span>
                <span>{{ formatPaymentType(item.paymentType) }}</span>
              </div>

              <span>{{ item.count }} шт.</span>
            </div>
          </template>
        </a-list>
      </div>
    </div>
    <div v-else>
      <h1 class="rounded-xl bg-gray-50 px-4 py-3 text-center text-gray-300">
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

const { serverData: sales, sendRequest, isLoading } = useApiRequest()

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

onMounted(async () => {
  await sendRequest("get", "/point/sales")
})
</script>

<style lang="scss" scoped></style>
