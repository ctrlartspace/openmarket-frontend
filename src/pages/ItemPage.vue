<template>
  <div
    class="grid grid-cols-10 bg-white rounded border border-gray-200 overflow-auto"
  >
    <form
      v-if="item"
      class="col-span-4 border-r"
      @submit.prevent="saveItemData"
    >
      <input v-show="false" type="submit" />
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Штрихкод</span>
      </div>
      <div class="flex items-center border-b border-gray-200">
        <input
          v-model="item.item_code"
          type="text"
          class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="123456789"
          :disabled="!isEditMode"
        />
        <span
          v-if="item.item_code && isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          @click="item.item_code = ''"
          >close</span
        >
      </div>

      <div class="px-4 py-2 border-b">
        <span class="text-lg">Наименование</span>
      </div>
      <div class="flex items-center border-b border-gray-200">
        <input
          v-model="item.item_name"
          type="text"
          class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="ZX 3000"
          :disabled="!isEditMode"
        />
        <span
          v-if="item.item_name && isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          @click="item.item_name = ''"
          >close</span
        >
      </div>
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Категория</span>
      </div>
      <div class="flex items-center border-b border-gray-200">
        <input
          v-model="item.item_category_id"
          type="text"
          class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Защитные стекла"
          :disabled="!isEditMode"
        />
        <span
          v-if="item.item_category_id && isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          @click="item.item_category_id = ''"
          >close</span
        >
      </div>
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Подкатегория</span>
      </div>
      <div class="flex items-center border-b border-gray-200">
        <input
          v-model="item.item_subcategory_id"
          type="text"
          class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="5D стекла"
          :disabled="!isEditMode"
        />
        <span
          v-if="item.item_subcategory_id && isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          @click="item.item_subcategory_id = ''"
          >close</span
        >
      </div>
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Бренд</span>
      </div>
      <div class="flex items-center border-gray-200">
        <input
          v-model="item.item_brand_id"
          type="text"
          class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Hoco"
          :disabled="!isEditMode"
        />
        <span
          v-if="item.item_brand_id && isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          @click="item.item_brand_id = ''"
          >close</span
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getItem } from "@/services/ItemSearch"

const route = useRoute()

const item = ref({})
const isEditMode = ref(true)

const saveItemData = () => {
  console.log(item.value)
}
onMounted(async () => {
  const id = route.params.id
  if (id) {
    item.value = await getItem(id)
    if (item.value) {
      isEditMode.value = false
    }
  }
})
</script>
