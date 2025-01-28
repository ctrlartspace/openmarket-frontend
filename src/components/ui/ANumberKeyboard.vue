<template>
  <div class="grid h-full grid-cols-3 gap-2">
    <div
      v-for="i in 10"
      :key="i"
      :class="i - 1 === 0 ? 'order-last col-span-3' : ''"
      class="bg-text-white rounded-xl bg-gray-100 transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
    >
      <button
        :class="{ 'aspect-square': i - 1 > 0 }"
        class="flex h-full w-full items-center justify-center py-6 text-xl font-medium"
        @mousedown.prevent="onKeyboardClick(i - 1)"
      >
        {{ i - 1 }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineModel } from "vue"

const modelValue = defineModel()

const onKeyboardClick = (value) => {
  modelValue.value = modelValue.value + String(value)
}
</script>
