<template>
  <div class="overflow-hidden rounded-xl border">
    <div
      v-if="showAction"
      class="flex items-center justify-between gap-2 bg-white px-4 py-2"
    >
      <div
        class="flex cursor-pointer items-center gap-2 hover:text-red-600 active:text-red-600"
      >
        <span class="material-symbols-rounded md:text-[28px]">remove</span>
        <span class="hidden text-lg md:inline md:text-base">Удалить</span>
      </div>
      <slot name="afterSelect"> </slot>
    </div>
    <div v-else class="flex items-center gap-2 bg-white px-4 py-2">
      <span class="material-symbols-rounded text-gray-300 md:text-[28px]"
        >search</span
      >

      <input
        type="text"
        class="h-full w-full text-ellipsis text-lg placeholder:text-gray-300 focus:outline-none md:text-base"
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
