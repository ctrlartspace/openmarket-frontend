<template>
  <a-page>
    <template #header>
      <a-link :to="filterPathMulti" primary>
        <span class="material-symbols-outlined text-[28px]">menu</span>
      </a-link>
      <a-link primary to="/arrivals/items/add"> Добавить</a-link>
    </template>
    <template #floating>
      <a-link-floating :to="filterPathMulti" primary>
        page_info
      </a-link-floating>
      <a-link-floating primary to="/arrivals/items/add"> add</a-link-floating>
    </template>

    <a-list
      @click="onItemClick"
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
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import { getSales } from "@/services/sales/items.js"

const router = useRouter()
const sales = ref([])
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } =
  useFilters()

const getPointItems = async () => {
  try {
    sales.value = await getSales({
      filters: joinedFilters.value,
    })
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = (item) => {
  router.push(`/point/items/${item.pointItem.id}`)
}

onMounted(() => {
  getPointItems()
})
</script>

<style lang="scss" scoped></style>
