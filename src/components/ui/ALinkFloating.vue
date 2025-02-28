<template>
  <router-link
    v-press
    class="pointer-events-auto ml-2 flex h-[55px] w-[55px] items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4 px-4 font-medium first:ml-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
    custom
    v-bind="$props"
  >
    <button
      :class="{
        'animate-pulse': loading,
        'text-black hover:bg-gray-50 hover:text-gray-700': gray,
        'text-blue-600 hover:bg-gray-50 hover:text-blue-700 dark:text-blue-400':
          primary,
        'text-red-600 hover:bg-gray-50 hover:text-red-700': danger,
        'text-yellow-600 hover:bg-gray-50 hover:text-yellow-700': info,
        'text-green-500 hover:bg-gray-50 hover:text-green-700 dark:text-green-400':
          success,
        'rounded-xl border': rounded,
      }"
      :disabled="loading"
      class="flex items-center justify-center"
      v-bind="$attrs"
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
  gray: { type: Boolean },
  primary: { type: Boolean },
  danger: { type: Boolean },
  info: { type: Boolean },
  success: { type: Boolean },
  rounded: { type: Boolean },
})
</script>

<style lang="scss" scoped></style>
