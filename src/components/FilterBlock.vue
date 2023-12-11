<template>
  <div class="bg-white border border-gray-200 rounded">
    <div
      class="relative px-4 py-2 flex items-center justify-between last:border-none"
    >
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <button
        class="inline-flex items-center"
        @click="isMoreActive = !isMoreActive"
      >
        <span class="material-icons-outlined hover:text-gray-600 cursor-pointer"
          >more_vert</span
        >
      </button>
      <ul
        v-if="isMoreActive"
        class="absolute z-10 w-full left-0 top-full text-lg bg-white border-t rounded-b border-gray-200 shadow-xl"
      >
        <li>
          <button
            class="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="editItemClick"
          >
            <span class="material-icons-outlined">edit</span>
            Редактировать
          </button>
        </li>
        <li>
          <button
            class="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click.self="addItemClick"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </button>
        </li>
      </ul>
    </div>
    <filter-tree
      v-model="filterItems"
      :items="items"
      item-value="id"
      item-name="name"
    ></filter-tree>
  </div>
</template>

<script setup>
import FilterTree from "./FilterTree.vue"
import { ref, watch } from "vue"

const props = defineProps([
  "items",
  "title",
  "itemValue",
  "itemName",
  "modelValue",
])
const emit = defineEmits(["update:modelValue"])

const isMoreActive = ref(false)
const filterItems = ref([])

const updateModelValue = () => {
  emit("update:modelValue", filterItems.value)
}
watch(filterItems, updateModelValue)
</script>
