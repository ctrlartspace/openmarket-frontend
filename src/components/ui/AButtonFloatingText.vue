<template>
  <button
    :class="{
      'animate-pulse': loading,
      'text-neutral-800 hover:bg-neutral-100 hover:text-neutral-700': neutral,
      'text-blue-600 hover:bg-gray-50 hover:text-blue-700': primary,
      'text-red-600 hover:bg-gray-50 hover:text-red-700': danger,
      'text-yellow-600 hover:bg-gray-50 hover:text-yellow-700': info,
      'text-green-600 hover:bg-gray-50 hover:text-green-700': success,
      'text-pink-500 hover:bg-gray-50 hover:text-pink-700': accent,
      'border border-black bg-gradient-to-b from-neutral-800 to-black text-white':
        black,
      'w-full justify-center': block,
    }"
    :disabled="loading"
    class="flex w-screen items-center justify-center gap-2 p-4 text-center text-2xl font-medium md:text-base"
    v-bind="$attrs"
    v-press
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
  black: { type: Boolean },
  block: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
