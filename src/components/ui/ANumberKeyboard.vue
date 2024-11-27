<template>
  <div class="grid h-full grid-cols-3 gap-2">
    <div
      v-for="i in 10"
      :key="i"
      class="bg-text-white rounded-xl bg-neutral-100 transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
      :class="i - 1 === 0 ? 'order-last col-span-3' : ''"
    >
      <button
        @mousedown.prevent="onKeyboardClick(i - 1)"
        class="h-full w-full py-6 text-2xl font-medium"
        :class="{ 'aspect-square': i - 1 > 0 }"
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
