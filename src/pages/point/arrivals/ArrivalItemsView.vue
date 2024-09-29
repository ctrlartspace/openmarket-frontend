<template>
  <a-page>
    <template #header>
      <a-link :to="filterPathMulti" primary>
        <span class="material-symbols-outlined text-[28px]">menu</span>
      </a-link>
      <a-link
        primary
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
      >
        Добавить</a-link
      >
    </template>
    <template #floating>
      <a-link-floating :to="filterPathMulti" primary>
        page_info
      </a-link-floating>
      <a-link-floating
        primary
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
      >
        add</a-link-floating
      >
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
import ArrivalService from "@/services/arrivals/items.js"
import DataTable from "@/components/ui/DataTable.vue"
import { useFilters } from "@/composables/filters.js"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"

const router = useRouter()
const pointItems = ref([])
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } =
  useFilters()

const getPointItems = async () => {
  try {
    pointItems.value = await ArrivalService.getArrivalItems({
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
