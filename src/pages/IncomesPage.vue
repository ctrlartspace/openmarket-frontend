<template>
  <div class="grid grid-cols-10 gap-2">
    <div class="col-span-10 md:col-span-3">
      <div
        class="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white first:mt-0 md:rounded-lg"
      >
        <div
          class="relative flex items-center justify-between border-b border-gray-200 px-4 py-2 last:border-none"
        >
          <h2 class="text-lg font-medium md:text-base">Категории</h2>
        </div>
        <filter-tree
          v-model="selectedFilters"
          :items="filtersList"
          nested="true"
          @change="updateItems"
        />
      </div>
    </div>
    <div class="col-span-10 md:col-span-7">
      <search-field class="mb-2">
        <template #action>
          <button
            class="flex items-center gap-2 rounded leading-8 text-blue-600 hover:brightness-95 active:brightness-95"
            type="button"
            @click="addIncomes"
          >
            <span class="hidden text-lg md:inline md:text-base">Добавить</span>
            <span class="material-icons-outlined">add</span>
          </button>
        </template>

        <template #afterSelect>
          <div>s</div>
        </template>
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

import { onMounted, ref } from "vue"
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
