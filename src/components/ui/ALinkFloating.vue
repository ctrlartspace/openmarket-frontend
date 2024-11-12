<template>
  <router-link class="flex items-center" custom v-bind="$props">
    <button
      :class="{
        'animate-pulse': loading,
        'text-black hover:bg-gray-50 hover:text-gray-700': neutral,
        'text-blue-600 hover:bg-gray-50 hover:text-blue-700': primary,
        'text-red-600 hover:bg-gray-50 hover:text-red-700': danger,
        'text-yellow-600 hover:bg-gray-50 hover:text-yellow-700': info,
        'text-green-600 hover:bg-gray-50 hover:text-green-700': success,
      }"
      :disabled="loading"
      class="flex aspect-square w-full items-center gap-2 rounded px-3 text-base font-medium"
      v-bind="$attrs"
      v-press
    >
      <span class="material-symbols-rounded text-3xl">
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
})
</script>

<style lang="scss" scoped></style>
