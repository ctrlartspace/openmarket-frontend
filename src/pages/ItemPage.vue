<template>
  <div class="grid grid-cols-10 bg-white rounded border border-gray-200">
    <form
      v-if="item"
      class="col-span-4 border-r"
      @submit.prevent="saveItemData"
    >
      <input v-show="false" type="submit" />
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Штрихкод</span>
      </div>
      <select-field
        v-model="item.item_category_id"
        :items="categories"
        placeholder="Категория"
        item-value="id"
        item-title="name"
      />
      <input-field v-model="item.item_code" placeholder="123456789" />

      <div class="px-4 py-2 border-b">
        <span class="text-lg">Наименование</span>
      </div>
      <input-field v-model="item.item_name" placeholder="ZX 300" />
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Категория</span>
      </div>
      <input-field
        v-model="item.item_category_id"
        placeholder="Защитные стекла"
      />

      <div class="px-4 py-2 border-b">
        <span class="text-lg">Подкатегория</span>
      </div>
      <input-field
        v-model="item.item_subcategory_id"
        placeholder="Противоударные"
      />
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Бренд</span>
      </div>
      <input-field v-model="item.item_brand_id" placeholder="Противоударные" />
    </form>
  </div>
</template>

<script setup>
import InputField from "@/components/ui/InputField.vue"
import SelectField from "../components/ui/SelectField.vue"

import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getItem } from "@/services/ItemSearch"

import {
  getBrands,
  getCategories,
  getSubcategories,
} from "@/services/ItemSearch"

const route = useRoute()

const item = ref({})
const isEditMode = ref(true)
const itemCategory = ref(null)

const brands = ref([])
const categories = ref([])
const subcategories = ref([])

const saveItemData = () => {
  console.log(item.value)
}
onMounted(async () => {
  brands.value = await getBrands()
  categories.value = await getCategories()
  subcategories.value = await getSubcategories()

  const id = route.params.id
  if (id) {
    item.value = await getItem(id)
    if (item.value) {
      isEditMode.value = false
    }
  }
})
</script>
