<template>
  <button
    v-press
    :class="{
      'animate-pulse': loading,
      'text-gray-800 hover:text-gray-700': gray && !solid,
      'text-blue-600 hover:text-blue-700': primary && !solid,
      'text-red-600 hover:text-red-700': danger && !solid,
      'text-yellow-600 hover:text-yellow-700': info && !solid,
      'text-green-500 hover:text-green-700': success && !solid,
      'text-pink-500 hover:text-pink-700': accent && !solid,
      'bg-white text-black': black && !solid,
      'bg-gray-800 text-white': gray && solid,
      'bg-blue-600 text-white': primary && solid,
      'border-none bg-rose-500 text-white': danger && solid,
      'bg-yellow-600 text-white': info && solid,
      'bg-green-500 text-white': success && solid,
      'bg-pink-500 text-white': accent && solid,
      'bg-black text-white': black && solid,
      'w-full justify-center': block,
      'rounded-xl border': rounded,
      'text-opacity-50 hover:text-opacity-50': $attrs.disabled,
    }"
    :disabled="loading"
    class="pointer-events-auto flex h-[55px] w-full items-center justify-center gap-2 border-b border-l border-t border-gray-100 p-4 font-medium shadow-2xl shadow-gray-500/20 first:rounded-l-xl last:rounded-r-xl last:border-r"
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
  solid: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
