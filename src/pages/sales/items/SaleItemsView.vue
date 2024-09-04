<template>
  <a-page>
    <template #header>
      <a-link :to="filterPathMulti" primary>
        <span class="material-icons-outlined text-[28px]">segment</span>
      </a-link>
      <a-link primary to="/arrivals/items/add"> Добавить</a-link>
    </template>

    <data-table
      :table-data="sales"
      :table-fields="tableFields"
      @on-item-click="onItemClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import DataTable from "@/components/ui/DataTable.vue"
import ALink from "@/components/ui/ALink.vue"
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

const tableFields = ref([
  {
    name: "pointItem.storeItem.name",
    className: "w-full",
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
])
</script>

<style lang="scss" scoped></style>
