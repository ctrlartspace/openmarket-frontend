<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-3 bg-white border border-gray-200 rounded px-4 py-2">
      <!-- Categories -->
      <div>
        <p class="text-lg font-semibold">Категория</p>
        <span
          v-for="item in categories"
          class="text-lg cursor-pointer"
          :class="
            filters.categoryId === item.id ? 'text-black' : 'text-gray-300'
          "
          @click="onCategoryClick(item.id)"
        >
          {{ item.name }}
          <br />
        </span>
      </div>
      <!-- Subcategories -->
      <div class="mt-2">
        <p class="text-lg font-semibold">Подкатегория</p>
        <span
          v-for="item in subcategories"
          class="text-lg cursor-pointer"
          :class="
            filters.subcategoryId === item.id ? 'text-black' : 'text-gray-300'
          "
          @click="onSubcategoryClick(item.id)"
        >
          {{ item.name }}
          <br />
        </span>
      </div>
      <!-- Brands -->
      <div class="mt-2">
        <p class="text-lg font-semibold">Бренд</p>
        <span
          v-for="item in brands"
          class="text-lg cursor-pointer"
          :class="filters.brandId === item.id ? 'text-black' : 'text-gray-300'"
          @click="onBrandClick(item.id)"
        >
          {{ item.name }}
          <br />
        </span>
      </div>
      <!-- Filter Reset -->
      <div class="mt-4">
        <span
          class="text-lg text-gray-300 cursor-pointer hover:underline"
          @click="resetFilters"
          >Сбросить</span
        >
      </div>
    </div>
    <div class="col-span-7 bg-white border rounded overflow-auto">
      <div class="px-4 py-2 flex border-b">
        <div class="flex-1 flex items-center">
          <span class="material-icons text-gray-300">search</span>
          <input
            type="text"
            class="ml-2 w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
            placeholder="Код товара, наименование"
          />
        </div>
        <div class="flex cursor-pointer hover:text-blue-400">
          <span class="self-center material-icons">add</span>
          <div class="ml-2 text-lg flex-auto">Новый товар</div>
        </div>
      </div>
      <div
        v-if="selectedItems.length > 0"
        class="flex justify-between px-4 py-2 border-b"
      >
        <div class="flex items-center hover:text-red-400 cursor-pointer">
          <span class="material-icons">remove</span>
          <span class="ml-2 text-lg">Удалить</span>
        </div>
        <div class="ml-4 flex items-center hover:text-blue-400 cursor-pointer">
          <span class="material-icons-outlined">shopping_bag</span>
          <span class="ml-2 text-lg">Показать в магазине</span>
        </div>
      </div>
      <table class="table-auto w-full text-lg text-left bg-white">
        <tbody>
          <tr
            v-for="item in items"
            class="cursor-pointer hover:bg-gray-100 border-b flex items-center justify-between gap-2 px-4 py-2"
          >
            <td class="flex items-center p-1">
              <input
                v-model="selectedItems"
                type="checkbox"
                class="w-4 h-4 text-lg rounded"
                :value="item.id"
              />
            </td>
            <td class="font-semibold flex-1">
              {{ `${item.item_brand.name} ${item.item_name}` }}
            </td>
            <td>{{ item.item_category.name }}</td>
            <td>1 шт</td>
            <td>{{ item.item_purchase_price }} KZT</td>
          </tr>
        </tbody>
      </table>
      <!-- <base-data-item v-for="(item, i) in items" :item="item" :key="i" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

import {
  getBrands,
  getCategories,
  getSubcategories,
  getItems,
} from "@/services/ItemSearch"

const brands = ref([])
const categories = ref([])
const subcategories = ref([])
const items = ref([])

const filters = ref({
  brandId: 0,
  categoryId: 0,
  subcategoryId: 0,
})

const selectedItems = ref([])

const queryParams = computed(() => {
  const queryString = Object.keys(filters.value)
    .filter(
      (key) =>
        filters.value[key] !== null &&
        filters.value[key] !== undefined &&
        filters.value[key] !== 0
    )
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(filters.value[key])}`
    )
    .join("&")

  return queryString ? `${queryString}` : ""
})

const updateItems = async () => {
  items.value = await getItems(queryParams.value)
}

const onBrandClick = (id) => {
  filters.value.brandId = filters.value.brandId === id ? 0 : id
  updateItems()
}
const onCategoryClick = (id) => {
  filters.value.categoryId = filters.value.categoryId === id ? 0 : id
  updateItems()
}

const onSubcategoryClick = (id) => {
  filters.value.subcategoryId = filters.value.subcategoryId === id ? 0 : id
  updateItems()
}

const resetFilters = () => {
  Object.keys(filters.value).forEach((key) => {
    filters.value[key] = 0
  })
  updateItems()
}

onMounted(async () => {
  items.value = await getItems()
  brands.value = await getBrands()
  categories.value = await getCategories()
  subcategories.value = await getSubcategories()
})
</script>
