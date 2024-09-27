<template>
  <a-page>
    <div class="grid grid-cols-10 gap-2">
      <div class="col-span-10 hidden md:col-span-3 md:block">
        <div
          class="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white first:mt-0 md:rounded-lg"
        >
          <div
            class="relative flex items-center justify-between border-b border-gray-200 px-4 py-2 last:border-none"
          >
            <h2 class="text-lg font-medium md:text-base">Категории</h2>
            <button
              class="inline-flex items-center"
              @click="showDialog.editFilter = true"
            >
              <span
                class="material-icons-outlined cursor-pointer hover:text-gray-600 active:text-gray-600 md:text-[28px]"
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
                v-model="newFilter.parentId"
                :items="filtersList"
                class="border-b border-gray-200"
                select-root="true"
                single="true"
              />
              <div class="flex flex-wrap gap-2 p-4">
                <input
                  v-model="newFilter.name"
                  :placeholder="
                    newFilter.parentId
                      ? 'Название подкатегории'
                      : 'Название категории'
                  "
                  class="block w-full appearance-none rounded-xl border border-gray-200 bg-inherit px-4 py-2 text-lg placeholder:font-normal placeholder:text-gray-300 focus:outline-none md:rounded-lg md:text-base"
                  type="text"
                />
                <button
                  class="w-full flex-1 rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-50 active:bg-gray-50 md:rounded-lg"
                  @click="addFilter"
                >
                  <span class="text-lg font-medium md:text-base">Добавить</span>
                </button>
                <button
                  class="w-full flex-1 rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-50 active:bg-gray-50 md:rounded-lg"
                  @click="deleteFilter"
                >
                  <span class="text-lg font-medium md:text-base">Удалить</span>
                </button>
              </div>
            </div>
          </app-dialog>
          <filter-tree
            v-model="selectedFilters"
            :items="filtersList"
            nested="true"
            @change="updateItems"
          />
        </div>
        <!-- Filter Reset -->
        <button
          class="mt-2 hidden w-full items-center gap-2 rounded border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 md:flex"
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
              class="flex items-center gap-2 rounded leading-8 hover:brightness-95 active:brightness-95 md:hidden"
              type="button"
              @click="showDialog.showFilterMobile = true"
            >
              <span class="material-icons-outlined md:text-[28px]">tune</span>
            </button>
            <app-dialog
              v-if="showDialog.showFilterMobile"
              title="Категории"
              @close="showDialog.showFilterMobile = false"
            >
              <filter-tree
                v-model="selectedFilters"
                :items="filtersList"
                class="overflow-hidden rounded-xl border-gray-200"
                nested="true"
              />
            </app-dialog>
            <button
              class="hidden items-center gap-2 rounded leading-8 hover:brightness-95 active:brightness-95 md:flex"
              type="button"
              @click="newItemClick"
            >
              <span class="hidden text-lg md:inline md:text-base">Новый</span>
              <span class="material-icons-outlined md:text-[28px]">add</span>
            </button>
          </template>

          <template #afterSelect>
            <button
              class="hidden items-center gap-2 rounded leading-8 hover:brightness-95 active:brightness-95 md:flex"
              type="button"
              @click="newItemClick"
            >
              <span class="material-icons-outlined md:text-[28px]"
                >shopping_bag</span
              >
              <span class="hidden text-lg md:block md:text-base"
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
  </a-page>
</template>

<script setup>
import FilterTree from "@/components/FilterTree.vue"
import AppDialog from "@/components/AppDialog.vue"
import SearchField from "@/components/ui/SearchField.vue"
import DataTable from "@/components/ui/DataTable.vue"

import { onMounted, ref } from "vue"
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
  items.value = await PointService.getPointItems(filterQuery)
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
  items.value = await PointService.getPointItems()
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
    postfix: " ₸",
  },
])
</script>
