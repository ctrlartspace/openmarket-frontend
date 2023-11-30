<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-3 bg-white border border-gray-200 rounded">
      <!-- Categories -->
      <div>
        <div class="px-4 py-2 border-b">
          <p class="text-lg font-semibold">Категория</p>
        </div>
        <div
          v-for="item in categories"
          class="flex items-center gap-3 px-4 py-2 border-b"
        >
          <input
            v-model="filters.categoryId"
            type="checkbox"
            class="w-4 h-4 text-lg rounded"
            :value="item.id"
            @click.stop
          />
          <span class="text-lg">{{ item.name }}</span>
        </div>
      </div>
      <!-- Subcategories -->
      <div>
        <div class="px-4 py-2 border-b">
          <p class="text-lg font-semibold">Подкатегория</p>
        </div>
        <div
          v-for="item in subcategories"
          class="flex items-center gap-3 px-4 py-2 border-b"
        >
          <input
            v-model="filters.subcategoryId"
            type="checkbox"
            class="w-4 h-4 text-lg rounded"
            :value="item.id"
            @click.stop
          />
          <span class="text-lg">{{ item.name }}</span>
        </div>
      </div>
      <!-- Brands -->
      <div>
        <div class="px-4 py-2 border-b">
          <p class="text-lg font-semibold">Бренд</p>
        </div>
        <div
          v-for="item in brands"
          class="flex items-center gap-3 px-4 py-2 border-b"
        >
          <input
            v-model="filters.brandId"
            type="checkbox"
            class="w-4 h-4 text-lg rounded"
            :value="item.id"
            @click.stop
          />
          <span class="text-lg">{{ item.name }}</span>
        </div>
      </div>
      <!-- Filter Reset -->
      <div class="px-4 py-2 bg-gray-50 border-b"></div>
      <div
        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="resetFilters"
      >
        <span class="text-lg text-gray-300">Сбросить</span>
      </div>
    </div>
    <div class="col-span-7 bg-white border rounded overflow-auto">
      <div v-if="selectedItems.length === 0" class="px-4 py-2 flex border-b">
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
      <div v-else class="flex justify-between px-4 py-2 border-b">
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
            @click="onItemClick(item.id)"
          >
            <td class="flex items-center">
              <input
                v-model="selectedItems"
                type="checkbox"
                class="w-4 h-4 text-lg rounded"
                :value="item.id"
                @click.stop
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
import { ref, watch, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

import {
  getBrands,
  getCategories,
  getSubcategories,
  getItems,
} from "@/services/ItemSearch"

const router = useRouter()

const brands = ref([])
const categories = ref([])
const subcategories = ref([])
const items = ref([])

const filters = ref({
  brandId: [],
  categoryId: [],
  subcategoryId: [],
})

const selectedItems = ref([])

const queryParams = computed(() => {
  const queryString = Object.keys(filters.value)
    .filter((key) => filters.value[key].length > 0)
    .map((key) => `${key}=${filters.value[key].toString()}`)
    .join("&")

  return queryString ? `${queryString}` : ""
})

const updateItems = async () => {
  items.value = await getItems(queryParams.value)
}

const resetFilters = () => {
  Object.keys(filters.value).forEach((key) => {
    filters.value[key] = []
  })
  updateItems()
}

const onItemClick = (id) => {
  router.push(`/item/${id}`)
}

watch(queryParams, () => {
  updateItems()
})

onMounted(async () => {
  items.value = await getItems()
  brands.value = await getBrands()
  categories.value = await getCategories()
  subcategories.value = await getSubcategories()
})
</script>
