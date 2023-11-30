<template>
  <div
    class="grid grid-cols-10 bg-white rounded border border-gray-200 overflow-auto"
  >
    <div v-if="item" class="col-span-4 border-r">
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Штрихкод</span>
      </div>
      <div
        class="flex items-center border-b border-gray-200"
        :class="isEditMode ? 'text-black' : 'text-gray-300'"
      >
        <input
          type="text"
          class="block w-full px-4 py-2 text-lg bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Штрихкод"
          :value="item.item_code"
          :disabled="!isEditMode"
        />
        <span
          v-if="isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          >close</span
        >
      </div>

      <div class="px-4 py-2 border-b">
        <span class="text-lg">Наименование</span>
      </div>
      <div
        class="flex items-center border-b border-gray-200"
        :class="isEditMode ? 'text-black' : 'text-gray-300'"
      >
        <input
          type="text"
          class="block w-full px-4 py-2 text-lg bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Штрихкод"
          :value="item.item_name"
          :disabled="!isEditMode"
        />
        <span
          v-if="isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          >close</span
        >
      </div>
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Категория</span>
      </div>
      <div
        class="flex items-center border-b border-gray-200"
        :class="isEditMode ? 'text-black' : 'text-gray-300'"
      >
        <input
          type="text"
          class="block w-full px-4 py-2 text-lg bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Штрихкод"
          :value="item.item_category_id"
          :disabled="!isEditMode"
        />
        <span
          v-if="isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          >close</span
        >
      </div>
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Подкатегория</span>
      </div>
      <div
        class="flex items-center border-b border-gray-200"
        :class="isEditMode ? 'text-black' : 'text-gray-300'"
      >
        <input
          type="text"
          class="block w-full px-4 py-2 text-lg bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Штрихкод"
          :value="item.item_subcategory_id"
          :disabled="!isEditMode"
        />
        <span
          v-if="isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          >close</span
        >
      </div>
      <div class="px-4 py-2 border-b">
        <span class="text-lg">Бренд</span>
      </div>
      <div
        class="flex items-center border-gray-200"
        :class="isEditMode ? 'text-black' : 'text-gray-300'"
      >
        <input
          type="text"
          class="block w-full px-4 py-2 text-lg bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
          placeholder="Штрихкод"
          :value="item.item_brand_id"
          :disabled="!isEditMode"
        />
        <span
          v-if="isEditMode"
          class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
          >close</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getItem } from "@/services/ItemSearch"

const route = useRoute()

const item = ref(null)
const isEditMode = ref(false)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    item.value = await getItem(id)
  }
})
</script>
