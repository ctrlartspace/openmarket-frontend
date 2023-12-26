<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-3">
      <!-- Categories -->
      <div class="bg-white border border-gray-200 rounded overflow-hidden">
        <filter-header title="Категория" />
        <filter-tree v-model="filters.categoryId" :items="categories" />
      </div>
      <!-- Brands -->
      <div class="mt-2 bg-white border border-gray-200 rounded overflow-hidden">
        <filter-header title="Бренд" />
        <filter-tree v-model="filters.brandId" :items="brands" />
      </div>
      <!-- Filter Reset -->
      <button
        class="mt-2 w-full bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
        @click="resetFilters"
      >
        <span class="material-icons-outlined">filter_list_off</span>
        <span class="text-lg">Сбросить</span>
      </button>
      <button
        class="mt-2 w-full bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
        @click="goToEditFilters"
      >
        <span class="material-icons-outlined">edit</span>
        <span class="text-lg">Редактировать</span>
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
                {{ `${item.brand?.name} ${item.name}` }}
              </td>
              <td>{{ item.category?.name }}</td>
              <td>1 шт</td>
              <td>{{ item.purchase_price }} KZT</td>
            </tr>
          </tbody>
        </table>
        <!-- <base-data-item v-for="(item, i) in items" :item="item" :key="i" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterHeader from "@/components/FilterHeader.vue"
import FilterTree from "@/components/FilterTree.vue"

import { ref, watch, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

import {
  getBrands,
  getCategories,
  getItems,
  addBrand,
  addCategory,
  updateCategory,
  updateBrand,
  deleteCategory,
  deleteBrand,
} from "@/services/ItemSearch"

const router = useRouter()

const brands = ref([])
const categories = ref([])
const items = ref([])

const filters = ref({
  brandId: [],
  categoryId: [],
})

const selectedItems = ref([])

const updateItems = async () => {
  items.value = await getItems(queryParams.value)
}
const queryParams = computed(() => {
  const queryString = Object.keys(filters.value)
    .filter((key) => filters.value[key].length > 0)
    .map((key) => `${key}=${filters.value[key].toString()}`)
    .join("&")

  return queryString ? `${queryString}` : ""
})

watch(queryParams, updateItems)

const resetFilters = () => {
  Object.keys(filters.value).forEach((key) => {
    filters.value[key] = []
  })
  updateItems()
}

const onItemClick = (id) => {
  router.push(`/item/${id}`)
}

const newItemClick = () => {
  router.push("/item")
}

const goToEditFilters = () => {
  router.push("/filters")
}

onMounted(async () => {
  items.value = await getItems()
  brands.value = await getBrands()
  categories.value = await getCategories()
})
</script>
