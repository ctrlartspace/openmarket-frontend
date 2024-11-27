<template>
  <router-link
    class="pointer-events-auto ml-2 flex aspect-square h-[55px] w-max items-center justify-center gap-2 rounded-xl border-b border-l border-t border-neutral-100 bg-white p-4 px-3 font-medium shadow-lg shadow-neutral-300/20 first:ml-0"
    custom
    v-bind="$props"
    v-press
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
      v-bind="$attrs"
      class="flex items-center justify-center"
    >
      <span class="material-symbols-rounded">
        <slot></slot>
      </span>
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
