<template>
  <div class="grid grid-cols-10 gap-2">
    <div class="col-span-10 hidden md:col-span-3 md:block">
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
      <!-- Filter Reset -->
      <button
        class="mt-2 hidden w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 active:bg-gray-50 md:flex md:rounded-lg"
        @click="resetFilters"
      >
        <span class="material-symbols-outlined">filter_list_off</span>
        <span class="text-lg md:text-base">Сбросить</span>
      </button>
    </div>
    <div class="col-span-10 md:col-span-7">
      <!-- <div class="bg-white border md:rounded-lg rounded-xl overflow-auto">
        <div
          v-if="selectedItems && selectedItems.length > 0"
          class="flex gap-2 justify-between px-4 py-2 border-b last:border-none"
        >
          <button
            class="flex gap-2 items-center hover:text-red-600 active:text-red-600 cursor-pointer"
            type="button"
          >
            <span class="material-symbols-outlined md:text-[28px]">remove</span>
            <span class="hidden md:inline text-lg md:text-base">Удалить</span>
          </button>
          <button
            class="flex items-center gap-2 text-blue-600 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="makeReturns"
          >
            <span class="material-symbols-outlined md:text-[28px]"
              >keyboard_backspace</span
            >
            <span class="hidden md:inline text-lg md:text-base"
              >Сделать возврат</span
            >
            <span class="inline md:hidden text-lg md:text-base">Возврат</span>
          </button>
        </div>
        <div v-else class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="flex h-full w-full gap-2 items-center">
            <span class="material-symbols-outlined text-gray-300 md:text-[28px]"
              >search</span
            >

            <input
              type="text"
              class="w-full block h-full text-lg md:text-base placeholder:text-gray-300 focus:outline-none"
              placeholder="Код товара, наименование"
            />
          </div>
          <button
            class="leading-8 md:hidden flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="showDialog.showFilterMobile = true"
          >
            <span class="material-symbols-outlined md:text-[28px]">tune</span>
          </button>
          <app-dialog
            v-if="showDialog.showFilterMobile"
            title="Категории"
            @close="showDialog.showFilterMobile = false"
          >
            <filter-tree
              class="border-gray-200"
              v-model="selectedFilters"
              :items="filtersList"
              @change="updateItems"
              nested="true"
            />
          </app-dialog>
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
              class="cursor-pointer hover:bg-gray-50 active:bg-gray-50 border-b flex gap-2 flex-wrap md:flex-nowrap md:flex-row md:items-center md:justify-between md:gap-2 px-4 py-2 last:border-none"
              @click="onItemClick(item.item.id)"
              :key="i"
            >
              <td
                class="flex md:flex-row md:justify-normal items-center gap-2 w-full md:w-max md:flex-1 font-medium"
              >
                <input
                  id="item-checkbox"
                  v-model="selectedItems"
                  class="w-4 h-4"
                  type="checkbox"
                  :value="item.id"
                  @click.stop
                />
                {{
                  `${item.item.filters
                    .map((filter) => filter.name)
                    .join(", ")} ${item.item.name}`
                }}
              </td>
               <td
                v-if="item.isReturned"
                class="flex items-center bg-red-50 rounded w-max order-4 md:order-none"
              >
                <span class="material-symbols-outlined text-red-600 md:text-[28px]"
                  >keyboard_backspace</span
                >
              </td> 
              <td
                class="flex items-center gap-2 rounded w-max md:flex-initial order-last md:order-none"
              >
                <span
                  v-if="item.isReturned"
                  class="material-symbols-outlined text-red-600 md:text-[28px]"
                  >keyboard_backspace</span
                >
                <span
                  class="material-symbols-outlined text-blue-600 md:text-[28px]"
                  >{{
                    item.paymentType === "cash-register" ? "payments" : "credit_card"
                  }}</span
                >
              </td>
              <td
                class="flex items-center text-gray-300 w-max order-4 md:order-none flex-1 md:flex-initial"
              >
                {{ item.count }} шт.
              </td>
              <td class="text-green-600 font-medium">
                {{ item.count * item.sellingPrice }} KZT
              </td>
            </tr>
          </tbody>
        </table>
      </div>-->
      <search-field class="mb-2">
        <template #action>
          <button
            class="flex items-center gap-2 rounded leading-8 text-blue-600 hover:brightness-95 active:brightness-95"
            type="button"
            @click="addIncomes"
          >
            <span class="hidden text-lg md:inline md:text-base">Добавить</span>
            <span class="material-symbols-outlined">add</span>
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
        <template #isReturned="{ item }">
          <div
            class="order-last flex w-max items-center gap-2 rounded md:order-none md:flex-initial"
          >
            <span
              v-if="item.isReturned"
              class="material-symbols-outlined text-red-600 md:text-[28px]"
              >keyboard_backspace</span
            >
            <span
              class="material-symbols-outlined text-blue-600 md:text-[28px]"
              >{{
                item.paymentType === "cash" ? "payments" : "credit_card"
              }}</span
            >
          </div>
        </template>
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
const showDialog = ref({ editFilter: false, showFilterMobile: false })

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

const onItemClick = (item) => {
  router.push(`/items/${item.id}`)
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
const tableFields = ref([
  {
    name: "item.name",
    className: "w-full",
  },
  { name: "isReturned" },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
  {
    name: "sellingPrice",
    className: "whitespace-nowrap ",
    postfix: " KZT",
  },
])
</script>
