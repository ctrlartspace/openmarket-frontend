<template>
  <a-page :loading="isLoading">
    <template #header>
      <a-link :to="filterPathMulti" primary> Категории </a-link>
      <a-link primary to="/arrivals/items/add"> Добавить</a-link>
    </template>
    <template #floating>
      <a-link-floating :to="filterPathMulti"> page_info </a-link-floating>
      <a-link-floating primary to="/arrivals/items/add"> add</a-link-floating>
    </template>

    <a-list
      v-if="sales"
      @on-item-click="onItemClick"
      :items="sales"
      title-field="pointItem.storeItem.name"
      description-field="count"
      description-hint="шт."
    ></a-list>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } =
  useFilters()

const { serverData: sales, sendRequest, isLoading } = useApiRequest()

const onItemClick = (item) => {
  router.push(`/point/items/${item.pointItem.id}`)
  console.log("dsf")
}

onMounted(async () => {
  await sendRequest("get", "/sales", { filters: joinedFilters.value })
})
</script>

<style lang="scss" scoped></style>
