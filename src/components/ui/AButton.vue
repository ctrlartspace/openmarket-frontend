<template>
  <button
    :class="{
      'animate-pulse': loading,
      'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700': neutral,
      'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700': primary,
      'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700': danger,
      'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700':
        info,
      'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700':
        success,
      'bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-700': accent,
      'w-full justify-center': block,
    }"
    :disabled="loading"
    class="px-2 flex items-center gap-2 text-base font-medium rounded"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  loading: { type: Boolean },
  neutral: { type: Boolean },
  primary: { type: Boolean },
  danger: { type: Boolean },
  info: { type: Boolean },
  success: { type: Boolean },
  accent: { type: Boolean },
  block: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
