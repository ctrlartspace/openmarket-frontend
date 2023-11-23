<template>
  <div class="grid grid-cols-6 gap-4">
    <div class="col-span-3">
      <p
        v-for="brand in brands"
        class="font-semibold text-lg cursor-pointer"
        :class="filters.brandId === brand.id ? 'text-black' : 'text-gray-300'"
        @click="onBrandClick(brand.id)"
      >
        {{ brand.name }}
      </p>
    </div>
    <div class="col-span-3">
      <base-data-item v-for="(item, i) in items" :item="item" :key="i" />
    </div>
  </div>
</template>

<script setup>
import BaseDataItem from "@/components/BaseDataItem.vue"
import { ref, computed, onMounted } from "vue"

import { getBrands, getItems } from "@/services/ItemSearch"

const brands = ref([])
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
  console.log(queryParams.value)
  items.value = await getItems(queryParams.value)
}

const onBrandClick = (brandId) => {
  Object.keys(filters.value).map((item) => {
    filters.value[item] = 0
  })
  console.log(filters.value)
  filters.value.brandId = filters.value.brandId !== 0 ? 0 : brandId
  updateItems()
}

onMounted(async () => {
  items.value = await getItems()
  brands.value = await getBrands()
})
</script>
