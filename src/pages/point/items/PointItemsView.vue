<template>
  <a-page :title="isSelectableMode ? 'Выбрать...' : ''">
    <template #header>
      <a-link :to="filterPathMulti" primary>
        <span class="material-icons-outlined text-[28px]">menu</span>
      </a-link>
      <a-link v-if="!isSelectableMode" primary to="/point/items/add"
        >Добавить
      </a-link>
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
import { useSelect } from "@/composables/useSelect.js"
import ALink from "@/components/ui/ALink.vue"

const router = useRouter()
const pointItems = ref([])
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } =
  useFilters()
const { isSelectableMode, applySelect } = useSelect()

const getPointItems = async () => {
  try {
    pointItems.value = await PointService.getPointItems({
      filters: joinedFilters.value,
    })
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item.id)
  } else {
    router.push(`/point/items/${item.id}`)
  }
}

onMounted(() => {
  getPointItems()
})

const tableFields = ref([
  {
    name: "storeItem.name",
    className: "w-full",
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
])
</script>

<style lang="scss" scoped></style>
