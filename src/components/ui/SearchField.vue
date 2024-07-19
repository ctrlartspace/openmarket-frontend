<template>
  <div class="border rounded-xl md:rounded overflow-hidden">
    <div
      v-if="showAction"
      class="px-4 py-2 flex gap-2 justify-between items-center bg-white"
    >
      <div
        class="flex gap-2 items-center hover:text-red-600 active:text-red-600 cursor-pointer"
      >
        <span class="material-icons md:text-[28px]">remove</span>
        <span class="hidden md:inline text-lg md:text-base">Удалить</span>
      </div>
      <slot name="afterSelect"> </slot>
    </div>
    <div v-else class="px-4 py-2 flex gap-2 items-center bg-white">
      <span class="material-icons md:text-[28px] text-gray-300">search</span>

      <input
        type="text"
        class="w-full h-full text-lg md:text-base placeholder:text-gray-300 focus:outline-none text-ellipsis"
        placeholder="Код товара, наименование"
      />
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const props = defineProps({
  showAction: {
    type: Boolean,
  },
})
</script>
