<template>
  <div class="grid grid-cols-10 gap-2">
    <div class="hidden md:block col-span-10 md:col-span-3">
      <div
        class="bg-white border border-gray-200 md:rounded rounded-xl overflow-hidden mt-2 first:mt-0"
      >
        <div
          class="relative px-4 py-2 flex items-center justify-between border-b border-gray-200 last:border-none"
        >
          <h2 class="text-lg md:text-base font-medium">Фильтры</h2>
          <button
            class="inline-flex items-center"
            @click="showDialog.editFilter = true"
          >
            <span
              class="material-icons-outlined md:text-[28px] hover:text-gray-600 active:text-gray-600 cursor-pointer"
            >
              more_vert
            </span>
          </button>
        </div>
        <app-dialog
          v-if="showDialog.editFilter"
          title="Новая категория"
          @close="showDialog.editFilter = false"
        >
          <div class="flex flex-col justify-center">
            <filter-tree
              class="border-b border-gray-200"
              v-model="newFilter.parentId"
              :items="filtersList"
              single="true"
              select-root="true"
            />
            <div class="flex flex-wrap gap-2 p-4">
              <input
                class="px-4 py-2 border rounded-xl md:rounded border-gray-200 block w-full text-lg md:text-base bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
                v-model="newFilter.name"
                type="text"
                :placeholder="
                  newFilter.parentId
                    ? 'Название подкатегории'
                    : 'Название категории'
                "
              />
              <button
                class="flex-1 w-full px-4 py-2 border border-gray-200 hover:bg-gray-50 active:bg-gray-50 md:rounded rounded-xl"
                @click="addFilter"
              >
                <span class="text-lg md:text-base font-medium">Добавить</span>
              </button>
              <button
                class="flex-1 w-full px-4 py-2 border border-gray-200 hover:bg-gray-50 active:bg-gray-50 md:rounded rounded-xl"
                @click="deleteFilter"
              >
                <span class="text-lg md:text-base font-medium">Удалить</span>
              </button>
            </div>
          </div>
        </app-dialog>
        <filter-tree
          v-model="selectedFilters"
          :items="filtersList"
          @change="updateItems"
          nested="true"
        />
      </div>
      <!-- Filter Reset -->
      <button
        class="hidden mt-2 w-full bg-white border border-gray-200 rounded px-4 py-2 md:flex items-center gap-2 hover:bg-gray-50"
        @click="resetFilters"
      >
        <span class="material-icons-outlined">filter_list_off</span>
        <span class="text-lg md:text-base">Сбросить</span>
      </button>
    </div>
    <div class="col-span-10 md:col-span-7">
      <search-field class="mb-2">
        <template #action>
          <button
            class="leading-8 md:hidden flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="showDialog.showFilterMobile = true"
          >
            <span class="material-icons-outlined md:text-[28px]">tune</span>
          </button>
          <app-dialog
            v-if="showDialog.showFilterMobile"
            title="Фильтры"
            @close="showDialog.showFilterMobile = false"
          >
            <filter-tree
              class="border-gray-200 rounded-xl overflow-hidden"
              v-model="selectedFilters"
              :items="filtersList"
              nested="true"
            />
          </app-dialog>
          <button
            class="hidden leading-8 md:flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="newItemClick"
          >
            <span class="hidden md:inline text-lg md:text-base">Новый</span>
            <span class="material-icons-outlined md:text-[28px]">add</span>
          </button>
        </template>

        <template #afterSelect>
          <button
            class="hidden leading-8 md:flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="newItemClick"
          >
            <span class="material-icons-outlined md:text-[28px]"
              >shopping_bag</span
            >
            <span class="hidden md:block text-lg md:text-base"
              >Показать в магазине</span
            >
          </button>
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
import AppDialog from "@/components/AppDialog.vue"
import SearchField from "@/components/ui/SearchField.vue"
import DataTable from "@/components/ui/DataTable.vue"

import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

import PointService from "@/services/PointService"

const router = useRouter()

const filtersList = ref([])
const items = ref([])

const selectedFilters = ref([])

const selectedItems = ref([])
const showDialog = ref({ editFilter: false, showFilterMobile: false })

const updateItems = async () => {
  const filterQuery = selectedFilters.value.join(",")
  items.value = await PointService.getItems(filterQuery)
}

const newFilter = ref({})

const resetFilters = () => {
  selectedFilters.value = []
  updateItems()
}

const onItemClick = (item) => {
  router.push(`/items/${item.id}`)
}

const newItemClick = () => {
  router.push("/items")
}

const addFilter = async () => {
  const data = {
    name: newFilter.value.name,
    parentId: newFilter.value.parentId,
  }

  await PointService.addFilter(data)
  newFilter.value.name = ""
  filtersList.value = await PointService.getFilters()
}

const deleteFilter = async () => {
  await PointService.deleteFilter(newFilter.value.parentId)
  filtersList.value = await PointService.getFilters()
}

onMounted(async () => {
  items.value = await PointService.getItems()
  filtersList.value = await PointService.getFilters()
})

const tableFields = ref([
  {
    name: "storeItem.name",
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
