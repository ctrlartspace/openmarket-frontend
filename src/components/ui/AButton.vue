<template>
  <button
    :class="{
      'animate-pulse': loading,
      'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 hover:text-neutral-700 active:bg-neutral-200':
        neutral,
      'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 active:bg-blue-100':
        primary,
      'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 active:bg-red-100':
        danger,
      'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 active:bg-yellow-100':
        info,
      'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 active:bg-green-100':
        success,
      'bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-700 active:bg-pink-100':
        accent,
      'bg-black text-white hover:bg-neutral-900 active:bg-neutral-800': black,
      'w-full justify-center': block,
    }"
    :disabled="loading"
    class="flex items-center gap-2 rounded px-4 text-lg font-medium md:text-base"
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
