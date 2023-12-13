<template>
  <div
    class="relative px-4 py-2 flex items-center justify-between border-b border-gray-200 last:border-none"
  >
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <button
      class="inline-flex items-center"
      @click="isMenuOpened = !isMenuOpened"
    >
      <span class="material-icons-outlined hover:text-gray-600 cursor-pointer"
        >more_vert</span
      >
    </button>
    <ul
      v-if="isMenuOpened"
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
</template>

<script setup>
import { ref } from "vue"

defineProps(["title"])
const isMenuOpened = ref(false)
</script>
