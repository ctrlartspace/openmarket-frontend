<template>
  <div>
    <div class="grid grid-cols-10 bg-white rounded border border-gray-200">
      <div v-if="item" class="col-span-4 border-r">
        <div class="px-4 py-2 border-b">
          <span class="text-lg font-semibold">Информация</span>
        </div>
        <input-field
          v-model="item.item_code"
          placeholder="Штрихкод"
          :disabled="!isEditMode"
        />

        <input-field
          v-model="item.item_name"
          placeholder="Наименование"
          :disabled="!isEditMode"
        />
        <select-field
          v-model="item.item_category_id"
          :items="categories"
          placeholder="Категория"
          item-value="id"
          item-title="name"
          :disabled="!isEditMode"
        />

        <select-field
          v-model="item.item_subcategory_id"
          :items="subcategories"
          placeholder="Подкатегория"
          item-value="id"
          item-title="name"
          :disabled="!isEditMode"
        />
        <select-field
          v-model="item.item_brand_id"
          :items="brands"
          placeholder="Бренд"
          item-value="id"
          item-title="name"
          :disabled="!isEditMode"
        />
      </div>
      <div class="col-span-6 px-4 py-2 flex"></div>
    </div>
    <div
      class="mt-4 inline-block bg-white border border-gray-200 rounded overflow-auto"
    >
      <div
        v-if="!isEditMode"
        class="px-4 py-2 text-blue-600 inline-flex gap-2 items-center border-l first:border-none cursor-pointer hover:bg-gray-50"
        @click="isEditMode = true"
      >
        <span class="material-icons-outlined">edit</span>
        <span class="text-lg">Редактировать</span>
      </div>
      <div
        v-if="isEditMode"
        class="px-4 py-2 text-blue-600 inline-flex gap-2 items-center border-l first:border-none cursor-pointer hover:bg-gray-50"
        @click="isEditMode = false"
      >
        <span class="material-icons-outlined">save</span>
        <span class="text-lg">Сохранить</span>
      </div>
      <!-- <button
        class="px-4 py-2 text-lg ont-semibold text-white bg-blue-400 border border-blue-600 rounded self-end flex items-center gap-2 hover:brightness-95"
        type="submit"
        @click="saveItemData"
      >
        <span class="material-icons-outlined">save</span>
        Сохранить
      </button> -->
    </div>
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
