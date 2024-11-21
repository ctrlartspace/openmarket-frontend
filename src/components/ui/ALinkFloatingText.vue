<template>
  <router-link
    class="flex w-screen items-center justify-center"
    custom
    v-bind="$props"
  >
    <button
      :class="{
        'animate-pulse': loading,
        'text-black hover:bg-gray-50 hover:text-gray-700': neutral,
        'text-blue-600 hover:bg-gray-50 hover:text-blue-700': primary,
        'text-red-600 hover:bg-gray-50 hover:text-red-700': danger,
        'text-yellow-600 hover:bg-gray-50 hover:text-yellow-700': info,
        'text-green-500 hover:bg-gray-50 hover:text-green-700': success,
        'rounded-xl border': rounded,
      }"
      :disabled="loading"
      class="pointer-events-auto flex h-16 w-full items-center justify-center gap-2 border-b border-l border-t border-neutral-200 bg-white p-4 px-3 text-2xl font-medium shadow-sm first:rounded-l-xl last:rounded-r-xl last:border-r"
      v-bind="$attrs"
      v-press
    >
      <slot></slot>
    </button>
  </router-link>
</template>

<script setup>
import { RouterLink } from "vue-router"

defineProps({
  ...RouterLink.props,
  loading: { type: Boolean },
  neutral: { type: Boolean },
  primary: { type: Boolean },
  danger: { type: Boolean },
  info: { type: Boolean },
  success: { type: Boolean },
  rounded: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
