<template>
  <div class="grid grid-cols-10 gap-2 p-4 pb-16 md:p-2">
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
              class="material-icons-outlined md:text-[28px] hover:text-gray-600 cursor-pointer"
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
              <!-- <input-field
              class=""
              v-model="newFilter.name"
              :placeholder="
                newFilter.parentId
                  ? 'Название подкатегории'
                  : 'Название категории'
              "
            /> -->
              <button
                class="flex-1 w-full px-4 py-2 border border-gray-200 hover:bg-gray-50 md:rounded rounded-xl"
                @click="addFilter"
              >
                <span class="text-lg md:text-base font-medium">Добавить</span>
              </button>
              <button
                class="flex-1 w-full px-4 py-2 border border-gray-200 hover:bg-gray-50 md:rounded rounded-xl"
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
      <div class="bg-white border md:rounded rounded-xl overflow-auto">
        <div
          v-if="selectedItems && selectedItems.length > 0"
          class="flex gap-2 justify-between px-4 py-2 border-b last:border-none"
        >
          <div
            class="flex gap-2 items-center hover:text-red-600 cursor-pointer"
          >
            <span class="material-icons md:text-[28px]">remove</span>
            <span class="hidden md:inline text-lg md:text-base">Удалить</span>
          </div>
          <div
            class="flex gap-2 items-center hover:text-blue-600 cursor-pointer"
          >
            <span class="material-icons-outlined md:text-[28px]"
              >shopping_bag</span
            >
            <span class="hidden md:block text-lg md:text-base"
              >Показать в магазине</span
            >
          </div>
        </div>
        <div v-else class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="flex-1 flex gap-2 items-center">
            <span class="material-icons md:text-[28px] text-gray-300"
              >search</span
            >
            <input
              type="text"
              class="w-full h-full text-lg md:text-base placeholder:text-gray-300 focus:outline-none text-ellipsis"
              placeholder="Код товара, наименование"
            />
          </div>
          <button
            class="leading-8 md:hidden flex items-center gap-2 rounded hover:brightness-95"
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
              @change="updateItems"
              nested="true"
            />
          </app-dialog>
          <button
            class="hidden leading-8 md:flex items-center gap-2 rounded hover:brightness-95"
            type="button"
            @click="newItemClick"
          >
            <span class="hidden md:inline text-lg md:text-base">Новый</span>
            <span class="material-icons-outlined md:text-[28px]">add</span>
          </button>
        </div>
        <table
          class="table-auto w-full text-lg md:text-base text-left bg-white"
        >
          <tbody>
            <tr
              v-if="items.length === 0"
              class="border-b flex justify-center px-4 py-2 last:border-none"
            >
              <span class="text-gray-300 text-lg md:text-base">Нет данных</span>
            </tr>
            <tr
              v-else
              v-for="(item, i) in items"
              class="cursor-pointer hover:bg-gray-50 border-b flex flex-col md:flex-row md:items-center md:justify-between md:gap-2 px-4 py-2 last:border-none"
              @click="onItemClick(item.id)"
              :key="i"
            >
              <td class="hidden md:flex items-center">
                <input
                  v-model="selectedItems"
                  class="w-4 h-4"
                  type="checkbox"
                  :value="item.id"
                  @click.stop
                />
              </td>
              <td class="font-medium flex-1">
                {{
                  `${item.filters.map((filter) => filter.name).join(", ")} ${
                    item.name
                  }`
                }}
              </td>
              <td>{{ item.count }} шт.</td>
              <td>{{ item.purchasePrice }} KZT</td>
            </tr>
          </tbody>
        </table>
        <div
          class="md:hidden absolute bottom-12 left-0 right-0 px-4 py-2 mb-safe"
        >
          <button
            class="w-full bg-blue-600 text-white flex justify-center items-center gap-4 text-lg px-4 py-2 rounded-xl hover:brightness-50 cursor-pointer select-none shadow-xl"
            @click="newItemClick"
          >
            <span>Новый товар</span>
            <span class="material-icons-outlined self-center">add</span>
          </button>
        </div>
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
const showDialog = ref({ editFilter: false, showFilterMobile: false })

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
    parentId: newFilter.value.parentId,
  }

  await DataManager.addFilter(data)
  newFilter.value.name = ""
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
