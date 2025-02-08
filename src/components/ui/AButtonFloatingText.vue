<template>
  <button
    v-press
    :class="{
      'animate-pulse': loading,
      'text-gray-800 hover:bg-gray-100 hover:text-gray-700': gray,
      'text-blue-600 hover:bg-gray-50 hover:text-blue-700': primary,
      'text-red-600 hover:bg-gray-50 hover:text-red-700': danger,
      'text-yellow-600 hover:bg-gray-50 hover:text-yellow-700': info,
      'text-green-500 hover:bg-gray-50 hover:text-green-700': success,
      'text-pink-500 hover:bg-gray-50 hover:text-pink-700': accent,
      '!bg-black text-white': black,
      'w-full justify-center': block,
      'rounded-xl border': rounded,
      'text-opacity-50 hover:text-opacity-50': $attrs.disabled,
    }"
    :disabled="loading"
    class="pointer-events-auto flex h-[55px] w-full items-center justify-center gap-2 border-b border-l border-t border-gray-100 bg-white p-4 font-medium shadow-2xl shadow-gray-500/20 first:rounded-l-xl last:rounded-r-xl last:border-r"
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
  rounded: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
