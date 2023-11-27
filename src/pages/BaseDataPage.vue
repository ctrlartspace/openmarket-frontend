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
            filters.categoryId === item.id ? 'text-green-400' : 'text-gray-300'
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
            filters.subcategoryId === item.id
              ? 'text-green-400'
              : 'text-gray-300'
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
          :class="
            filters.brandId === item.id ? 'text-green-400' : 'text-gray-300'
          "
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
      <div class="flex cursor-pointer border-b">
        <div class="flex-1 flex px-4 py-2 hover:bg-gray-100">
          <span class="self-center material-icons">add</span>
          <div class="ml-2 text-lg flex-auto">Добавить новый товар</div>
        </div>
        <div class="flex px-4 py-2 hover:bg-gray-100">
          <span class="self-center material-icons">edit</span>
        </div>
      </div>
      <table class="table-auto w-full text-lg text-left bg-white">
        <tbody>
          <tr
            v-for="item in items"
            class="cursor-pointer hover:bg-gray-100 border-b flex items-center justify-between gap-2 px-4 py-2"
          >
            <!-- <td class="flex items-center">
              <span
                class="material-icons rounded hover:bg-red-100 hover:text-red-700 select-none"
              >
                remove
              </span>
            </td> -->
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

const editMode = ref({
  category: false,
  subcategory: false,
  brand: false,
})

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
