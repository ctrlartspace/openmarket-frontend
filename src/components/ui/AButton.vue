<template>
  <button
    :class="{
      'animate-pulse': loading,
      'text-neutral-800 hover:text-neutral-700': neutral,
      'text-blue-600 hover:text-blue-700': primary,
      'text-red-600 hover:text-red-700': danger,
      'text-yellow-600 hover:text-yellow-700': info,
      'text-green-500 hover:text-green-700': success,
      'text-pink-500 hover:text-pink-700': accent,
      'text-white': black,
      'w-full justify-center': block,
    }"
    :disabled="loading"
    class="flex items-center gap-2 font-medium"
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
  black: { type: Boolean },
  block: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
