<template>
  <div class="grid grid-cols-10 gap-2">
    <div class="col-span-10 md:col-span-3">
      <div
        class="bg-white border border-gray-200 md:rounded rounded-xl overflow-hidden mt-2 first:mt-0"
      >
        <div
          class="relative px-4 py-2 flex items-center justify-between border-b border-gray-200 last:border-none"
        >
          <h2 class="text-lg md:text-base font-medium">Фильтры</h2>
        </div>
        <filter-tree
          v-model="selectedFilters"
          :items="filtersList"
          @change="updateItems"
          nested="true"
        />
      </div>
    </div>
    <div class="col-span-10 md:col-span-7">
      <search-field class="mb-2">
        <template #action>
          <button
            class="leading-8 flex items-center gap-2 text-blue-600 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="addIncomes"
          >
            <span class="hidden md:inline text-lg md:text-base">Добавить</span>
            <span class="material-icons-outlined">add</span>
          </button>
        </template>

        <template #afterSelect> <div>s</div></template>
      </search-field>
      <data-table
        v-model="selectedItems"
        :table-data="items"
        :table-fields="tableFields"
        @on-item-click="onItemClick"
      >
      </data-table>
    </div>
  </div>
</template>

<script setup>
import FilterTree from "@/components/FilterTree.vue"
import SearchField from "@/components/ui/SearchField.vue"
import DataTable from "@/components/ui/DataTable.vue"

import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

import * as DataManager from "@/services/ItemSearch"

const router = useRouter()

const filtersList = ref([])
const items = ref([])

const selectedFilters = ref([])

const selectedItems = ref([])

const updateItems = async () => {
  const filterQuery = selectedFilters.value.join(",")
  items.value = await DataManager.getIncomes(filterQuery)
}

const resetFilters = () => {
  selectedFilters.value = []
  updateItems()
}

const onItemClick = (item) => {
  router.push(`/items/${item.id}`)
}

const addIncomes = () => {
  router.push("/incomes/add")
}

onMounted(async () => {
  items.value = await DataManager.getIncomes()
  filtersList.value = await DataManager.getFilters()
})
const tableFields = ref([
  {
    name: "item.name",
    className: "w-full",
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
  {
    name: "purchasePrice",
    className: "whitespace-nowrap ",
    postfix: " KZT",
  },
])
</script>
