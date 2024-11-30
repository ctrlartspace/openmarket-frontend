<template>
  <a-page :loading="isLoading">
    <div class="flex flex-col gap-2" v-if="sales">
      <div v-for="data in groupedDataByDate" :key="data.date">
        <h1 class="mb-2 px-4 text-sm text-neutral-300">
          {{ fromNow(data.date) }}
        </h1>
        <a-list
          class="mb-4"
          @on-item-click="onItemClick"
          :items="data.items"
          title-field="pointItem.storeItem.name"
          description-field="count"
          description-hint="шт."
        >
          <template #title="{ item }">
            <span class="" v-if="item.pointItem">{{
              item.pointItem?.storeItem?.name
            }}</span>
            <span class="" v-else
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
            <div class="flex justify-between text-sm text-neutral-300">
              <div>
                <span>{{ formatPaymentType(item.paymentType) + " " }}</span>
                <span>{{ formatDate(item.createdAt, "HH:mm") }}</span>
              </div>

              <span>{{ item.count }} шт.</span>
            </div>
          </template>
        </a-list>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center text-neutral-300">Нет продаж</h1>
    </div>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import { useApiRequest } from "@/composables/useApiRequest"
import { fromNow, formatDate } from "@/utils/format-date"
import { formatPaymentType } from "@/utils/format-payment-type"
import { formatMoney } from "@/utils/format-money"

const router = useRouter()
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } =
  useFilters()

const { serverData: sales, sendRequest, isLoading } = useApiRequest()

const onItemClick = (item) => {
  router.push(`/point/items/${item.pointItem.id}`)
  console.log("dsf")
}

const groupedDataByDate = computed(() => {
  const groupedData = {}
  sales.value.forEach((item) => {
    const date = item.createdAt.split("T")[0]
    console.log(date)

    if (groupedData[date]) {
      groupedData[date].items.push(item)
    } else {
      groupedData[date] = {
        date: date,
        items: [item],
      }
    }
  })
  console.log(groupedData)
  return Object.values(groupedData)
})

onMounted(async () => {
  await sendRequest("get", "/point/sales", { filters: joinedFilters.value })
})
</script>

<style lang="scss" scoped></style>
