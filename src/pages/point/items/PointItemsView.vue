<template>
  <a-page>
    <template #header>
      <router-link
        :to="filterPathMulti"
        class="text-base font-medium text-blue-600"
      >
        Фильтры
        {{ filters ? `[${selectedFiltersLength}]` : "" }}
      </router-link
      >
      <router-link
        class="text-base font-medium text-blue-600"
        to="/point/items/add"
      >Добавить
      </router-link>
    </template>

    <data-table
      :table-data="pointItems"
      :table-fields="tableFields"
      @on-item-click="onItemClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import PointService from "@/services/PointService.js"
import DataTable from "@/components/ui/DataTable.vue"
import { useFilters } from "@/composables/filters.js"

const router = useRouter()
const pointItems = ref([])
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } = useFilters()

const getPointItems = async () => {
  try {
    pointItems.value = await PointService.getPointItems({
      filters: joinedFilters.value
    })
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = (item) => {
  router.push(`/point/items/${item.id}`)
}

onMounted(() => {
  getPointItems()
})

const tableFields = ref([
  {
    name: "storeItem.name",
    className: "w-full"
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
  {
    name: "purchasePrice",
    className: "whitespace-nowrap ",
    postfix: " KZT"
  }
])
</script>

<style lang="scss" scoped></style>
