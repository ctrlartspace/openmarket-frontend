<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-3">
      <div
        class="bg-white border border-gray-200 rounded overflow-hidden mt-2 first:mt-0"
      >
        <app-dialog title="Новая категория">
          <template #activator="{ action }">
            <div
              class="relative px-4 py-2 flex items-center justify-between border-b border-gray-200 last:border-none"
            >
              <h2 class="text-lg font-semibold">Фильтры</h2>
              <button class="inline-flex items-center" v-on="action">
                <span
                  class="material-icons-outlined hover:text-gray-600 cursor-pointer"
                >
                  more_vert
                </span>
              </button>
            </div>
          </template>
          <template #content>
            <div class="p-4 flex flex-col justify-center">
              <filter-tree
                class="mt-2 border border-gray-200 rounded overflow-hidden"
                v-model="newFilter.parentId"
                :items="filtersList"
                single="true"
                select-root="true"
              />
            </div>
          </template>
          <template #footer>
            <div class="border rounded border-gray-200">
              <input-field
                v-model="newFilter.name"
                :placeholder="
                  newFilter.parentId
                    ? 'Название подкатегории'
                    : 'Название категории'
                "
              />
            </div>
            <div class="mt-2 flex gap-2">
              <button
                class="flex-1 w-full px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded"
                @click="addFilter"
              >
                <span class="text-lg font-semibold">Добавить</span>
              </button>
              <button
                class="flex-1 w-full px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded"
                @click="deleteFilter"
              >
                <span class="text-lg font-semibold">Удалить</span>
              </button>
            </div>
          </template>
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
        class="mt-2 w-full bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
        @click="resetFilters"
      >
        <span class="material-icons-outlined">filter_list_off</span>
        <span class="text-lg">Сбросить</span>
      </button>
    </div>
    <div class="col-span-7">
      <div class="sticky top-4 bg-white border rounded overflow-auto">
        <div
          v-if="selectedItems && selectedItems.length > 0"
          class="flex gap-2 justify-between px-4 py-2 border-b last:border-none"
        >
          <div
            class="flex gap-2 items-center hover:text-red-600 cursor-pointer"
          >
            <span class="material-icons">remove</span>
            <span class="text-lg">Удалить</span>
          </div>
          <div
            class="flex gap-2 items-center hover:text-blue-600 cursor-pointer"
          >
            <span class="material-icons-outlined">shopping_bag</span>
            <span class="text-lg">Показать в магазине</span>
          </div>
        </div>
        <div v-else class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="flex-1 flex gap-2 items-center">
            <span class="material-icons text-gray-300">search</span>
            <input
              type="text"
              class="w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
              placeholder="Код товара, наименование"
            />
          </div>
          <button
            class="flex items-center gap-2 text-blue-600 rounded hover:brightness-95"
            type="button"
            @click="newItemClick"
          >
            <span class="text-lg">Новый</span>
            <span class="material-icons-outlined">add</span>
          </button>
        </div>
        <table class="table-auto w-full text-lg text-left bg-white">
          <tbody>
            <tr
              v-for="(item, i) in items"
              class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2 last:border-none"
              @click="onItemClick(item.id)"
              :key="i"
            >
              <td class="flex items-center">
                <input
                  v-model="selectedItems"
                  class="w-4 h-4"
                  type="checkbox"
                  :value="item.id"
                  @click.stop
                />
              </td>
              <td class="font-semibold flex-1">
                {{
                  `${item.filters.map((filter) => filter.name).join(", ")} ${
                    item.name
                  }`
                }}
              </td>
              <td>1 шт</td>
              <td>{{ item.purchase_price }} KZT</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterTree from "@/components/FilterTree.vue"
import AppDialog from "@/components/AppDialog.vue"
import InputField from "@/components/ui/InputField.vue"

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
  items.value = await DataManager.getItems(filterQuery)
}

const newFilter = ref({})

const resetFilters = () => {
  selectedFilters.value = []
  updateItems()
}

const onItemClick = (id) => {
  router.push(`/items/${id}`)
}

const newItemClick = () => {
  router.push("/items")
}

const addFilter = async () => {
  const data = {
    name: newFilter.value.name,
    parent_id: newFilter.value.parentId,
  }

  await DataManager.addFilter(data)
  filtersList.value = await DataManager.getFilters()
}

const deleteFilter = async () => {
  await DataManager.deleteFilter(newFilter.value.parentId)
  filtersList.value = await DataManager.getFilters()
}

onMounted(async () => {
  items.value = await DataManager.getItems()
  filtersList.value = await DataManager.getFilters()
})
</script>
