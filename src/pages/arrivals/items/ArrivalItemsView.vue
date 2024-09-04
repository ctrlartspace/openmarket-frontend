<template>
  <a-page>
    <template #header>
      <router-link
        :to="filterPathMulti"
        class="bg-blue-50 rounded  flex items-center text-blue-600"
      >
        <span class="material-icons-outlined text-[28px]">tune</span>
      </router-link
      >
      <router-link
        class="text-base font-medium text-blue-600"
        to="/arrivals/items/add"
      >Добавить
      </router-link>
    </template>

    <data-table
      :table-data="pointItems"
      :table-fields="tableFields"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import ArrivalService from "@/services/arrivals/items.js"
import DataTable from "@/components/ui/DataTable.vue"
import { useFilters } from "@/composables/filters.js"

const router = useRouter()
const pointItems = ref([])
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } = useFilters()

const getPointItems = async () => {
  try {
    pointItems.value = await ArrivalService.getArrivalItems({
      filters: joinedFilters.value
    })
  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  getPointItems()
})

const tableFields = ref([
  {
    name: "pointItem.storeItem.name",
    className: "w-full"
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" }
])
</script>

<style lang="scss" scoped></style>
