<template>
  <button
    :class="{
      'animate-pulse': loading,
      'text-gray-800 hover:text-gray-700': gray,
      'text-blue-600 hover:text-blue-700': primary,
      'text-red-600 hover:text-red-700': danger,
      'text-yellow-600 hover:text-yellow-700': info,
      'text-green-500 hover:text-green-700': success,
      'text-pink-500 hover:text-pink-700': accent,
      'text-white': black,
      'w-full justify-center': block,
      'text-opacity-50 hover:text-opacity-50': $attrs.disabled,
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
  gray: { type: Boolean },
  primary: { type: Boolean },
  danger: { type: Boolean },
  info: { type: Boolean },
  success: { type: Boolean },
  accent: { type: Boolean },
  black: { type: Boolean },
  block: { type: Boolean },
  solid: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
