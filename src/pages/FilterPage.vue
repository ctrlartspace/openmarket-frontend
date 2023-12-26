<template>
  <div class="grid grid-cols-10 gap-4">
    <div class="col-span-3">
      <div class="bg-white border border-gray-200 rounded overflow-hidden">
        <filter-header title="Категория" />
        <filter-tree
          v-model="filter.categoryId"
          :items="categories"
          single="true"
        />
      </div>
    </div>
    <div class="col-span-3">
      <div class="bg-white border border-gray-200 rounded overflow-hidden">
        <filter-header title="Бренд" />
        <filter-tree v-model="filter.brandId" :items="brands" single="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterHeader from "@/components/FilterHeader.vue"
import FilterTree from "@/components/FilterTree.vue"

import { ref, onMounted } from "vue"
import { getBrands, getCategories } from "@/services/ItemSearch"

const filter = ref({ categoryId: 0, brandId: 0 })

const categories = ref([])
const brands = ref([])

onMounted(async () => {
  categories.value = await getCategories()
  brands.value = await getBrands()
})
</script>
