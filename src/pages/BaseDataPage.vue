<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-3">
      <!-- Categories -->
      <filter-block
        v-model="filters.categoryId"
        :items="categories"
        title="Категория"
        item-value="id"
        item-name="name"
        @add-item-click="addNewCategory"
        @on-update-data="updateCategoryData"
        @on-delete="deleteCategoryData"
      />
      <!-- Subcategories -->
      <filter-block
        class="mt-2"
        v-model="filters.subcategoryId"
        :items="subcategories"
        title="Подкатегория"
        item-value="id"
        item-name="name"
        @add-item-click="addNewSubcategory"
        @on-update-data="updateSubcategoryData"
        @on-delete="deleteSubcategoryData"
      />
      <!-- Brands -->
      <filter-block
        class="mt-2"
        v-model="filters.brandId"
        :items="brands"
        title="Бренд"
        item-value="id"
        item-name="name"
        @add-item-click="addNewBrand"
        @on-update-data="updateBrandData"
        @on-delete="deleteBrandData"
      />
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
        <div v-else class="px-4 py-2 flex border-b last:border-none">
          <div class="flex-1 flex gap-2 items-center">
            <span class="material-icons text-gray-300">search</span>
            <input
              type="text"
              class="w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
              placeholder="Код товара, наименование"
            />
          </div>
          <div
            class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
            @click="newItemClick"
          >
            <span class="text-lg">Добавить</span>
            <span class="material-icons-outlined">add</span>
          </div>
        </div>
        <table class="table-auto w-full text-lg text-left bg-white">
          <tbody>
            <tr
              v-for="item in items"
              class="cursor-pointer hover:bg-gray-100 border-b flex items-center justify-between gap-2 px-4 py-2 last:border-none"
              @click="onItemClick(item.id)"
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
                {{ `${item.item_brand.name} ${item.item_name}` }}
              </td>
              <td>{{ item.item_category?.name }}</td>
              <td>1 шт</td>
              <td>{{ item.item_purchase_price }} KZT</td>
            </tr>
          </tbody>
        </table>
        <!-- <base-data-item v-for="(item, i) in items" :item="item" :key="i" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBlock from "@/components/FilterBlock.vue"

import { ref, watch, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

import {
  getBrands,
  getCategories,
  getSubcategories,
  getItems,
  addBrand,
  addCategory,
  addSubcategory,
  updateCategory,
  updateSubcategory,
  updateBrand,
  deleteCategory,
  deleteSubcategory,
  deleteBrand,
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

const newItemClick = () => {
  router.push("/item")
}

watch(queryParams, () => {
  updateItems()
})

const addNewBrand = async (name) => {
  await addBrand({ name })
  brands.value = await getBrands()
}

const addNewCategory = async (name) => {
  await addCategory({ name })
  categories.value = await getCategories()
}

const addNewSubcategory = async (name) => {
  await addSubcategory({ name })
  subcategories.value = await getSubcategories()
}

const updateCategoryData = async (data) => {
  await updateCategory(data)
  categories.value = await getCategories()
}
const updateSubcategoryData = async (data) => {
  await updateSubcategory(data)
  subcategories.value = await getSubcategories()
}

const updateBrandData = async (data) => {
  await updateBrand(data)
  brands.value = await getBrands()
}

const deleteCategoryData = async (id) => {
  await deleteCategory(id)
  categories.value = await getCategories()
}
const deleteSubcategoryData = async (id) => {
  await deleteSubcategory(id)
  subcategories.value = await getSubcategories()
}
const deleteBrandData = async (id) => {
  await deleteBrand(id)
  brands.value = await getBrands()
}

onMounted(async () => {
  items.value = await getItems()
  brands.value = await getBrands()
  categories.value = await getCategories()
  subcategories.value = await getSubcategories()
})
</script>
