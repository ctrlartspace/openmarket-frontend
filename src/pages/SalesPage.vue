<template>
  <div class="grid grid-cols-10 gap-4 p-4 md:p-0">
    <div class="col-span-10 md:col-span-3">
      <div
        class="bg-white border border-gray-200 md:rounded rounded-xl overflow-hidden mt-2 first:mt-0"
      >
        <div
          class="relative px-4 py-2 flex items-center justify-between border-b border-gray-200 last:border-none"
        >
          <h2 class="text-lg font-semibold">Фильтры</h2>
        </div>
        <filter-tree
          v-model="selectedFilters"
          :items="filtersList"
          @change="updateItems"
          nested="true"
        />
      </div>
      <!-- Filter Reset -->
      <!-- <button
        class="mt-2 w-full bg-white border border-gray-200 md:rounded rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
        @click="resetFilters"
      >
        <span class="material-icons-outlined">filter_list_off</span>
        <span class="text-lg">Сбросить</span>
      </button> -->
    </div>
    <div class="col-span-10 md:col-span-7">
      <div
        class="sticky top-4 bg-white border md:rounded rounded-xl overflow-auto"
      >
        <div
          v-if="selectedItems && selectedItems.length > 0"
          class="flex gap-2 justify-between px-4 py-2 border-b last:border-none"
        >
          <button
            class="flex gap-2 items-center hover:text-red-600 cursor-pointer"
            type="button"
          >
            <span class="material-icons">remove</span>
            <span class="hidden md:inline text-lg">Удалить</span>
          </button>
          <button
            class="flex items-center gap-2 text-blue-600 rounded hover:brightness-95"
            type="button"
            @click="makeReturns"
          >
            <span class="material-icons-outlined">keyboard_backspace</span>
            <span class="hidden md:inline text-lg">Сделать возврат</span>
          </button>
        </div>
        <div v-else class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="flex-1 flex gap-2 items-center h-7">
            <span class="material-icons text-gray-300">search</span>
            <input
              type="text"
              class="w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
              placeholder="Код товара, наименование"
            />
          </div>
        </div>
        <table class="table-auto w-full text-lg text-left bg-white">
          <tbody>
            <tr
              v-if="items.length === 0"
              class="border-b flex justify-center px-4 py-2 last:border-none"
            >
              <span class="text-gray-300 text-lg">Нет данных</span>
            </tr>
            <tr
              v-else
              v-for="(item, i) in items"
              class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2 last:border-none"
              @click="onItemClick(item.item.id)"
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
                  `${item.item.filters
                    .map((filter) => filter.name)
                    .join(", ")} ${item.item.name}`
                }}
              </td>
              <td
                v-if="item.isReturned"
                class="flex items-center bg-red-50 rounded"
              >
                <span class="material-icons text-red-600"
                  >keyboard_backspace</span
                >
              </td>
              <td class="text-gray-300">{{ item.count }} шт.</td>
              <td class="text-green-600 font-semibold">
                {{ item.count * item.sellingPrice }} KZT
              </td>
              <td class="flex items-center bg-blue-50 rounded">
                <span class="material-icons-outlined text-blue-600">{{
                  item.paymentType === "cash" ? "payments" : "credit_card"
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterTree from "@/components/FilterTree.vue"

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
  items.value = await DataManager.getSales(filterQuery)
}

const resetFilters = () => {
  selectedFilters.value = []
  updateItems()
}

const onItemClick = (id) => {
  router.push(`/items/${id}`)
}

const makeReturns = async () => {
  const ids = selectedItems.value.join(",")
  const data = { isReturned: true }
  await DataManager.updateSales(data, ids)
  items.value = await DataManager.getSales()
}

onMounted(async () => {
  items.value = await DataManager.getSales()
  console.log(items.value)
  filtersList.value = await DataManager.getFilters()
})
</script>
