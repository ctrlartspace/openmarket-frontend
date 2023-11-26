<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-2">
      <p class="text-lg font-semibold">Категория</p>
      <span
        v-for="item in categories"
        class="text-lg cursor-pointer"
        :class="
          filters.categoryId === item.id ? 'text-blue-400' : 'text-gray-300'
        "
        @click="onCategoryClick(item.id)"
      >
        {{ item.name }}
        <br />
      </span>
      <br />
      <p class="text-lg font-semibold">Подкатегория</p>
      <span
        v-for="item in subcategories"
        class="text-lg cursor-pointer"
        :class="
          filters.subcategoryId === item.id ? 'text-blue-400' : 'text-gray-300'
        "
        @click="onSubcategoryClick(item.id)"
      >
        {{ item.name }}
        <br />
      </span>
      <br />
      <p class="flex-auto text-lg font-semibold">Бренд</p>
      <span
        v-for="item in brands"
        class="text-lg cursor-pointer"
        :class="filters.brandId === item.id ? 'text-blue-400' : 'text-gray-300'"
        @click="onBrandClick(item.id)"
      >
        {{ item.name }}
        <br />
      </span>
      <br />
    </div>
    <div class="col-span-8 bg-white border rounded overflow-auto">
      <table class="table-auto w-full text-lg text-left bg-white">
        <!-- <thead>
          <tr class="border-b">
            <th class="px-4 py-2">Название</th>
            <th class="px-4 py-2">Категория</th>
            <th class="px-4 py-2">Подкатегория</th>
            <th class="px-4 py-2">Цена</th>
          </tr>
        </thead> -->
        <tbody>
          <tr
            v-for="item in items"
            class="cursor-pointer hover:bg-gray-100 border-b"
          >
            <td class="px-4 py-2 font-semibold">
              {{ `${item.item_brand.name} ${item.item_name}` }}
            </td>
            <td class="px-4 py-2">{{ item.item_category.name }}</td>
            <td class="px-4 py-2">{{ item.item_subcategory.name }}</td>
            <td class="px-4 py-2">{{ item.item_purchase_price }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <base-data-item v-for="(item, i) in items" :item="item" :key="i" /> -->
    </div>
  </div>
</template>

<script setup>
import BaseDataItem from "@/components/BaseDataItem.vue"
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

onMounted(async () => {
  items.value = await getItems()
  brands.value = await getBrands()
  categories.value = await getCategories()
  subcategories.value = await getSubcategories()
})
</script>
