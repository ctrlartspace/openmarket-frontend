<template>
  <router-link class="flex items-center" custom v-bind="$props">
    <button
      :class="{
        'animate-pulse': loading,
        'bg-gray-50 text-black hover:bg-gray-100 hover:text-gray-700': neutral,
        'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700':
          primary,
        'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700': danger,
        'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700':
          info,
        'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700':
          success,
      }"
      :disabled="loading"
      class="px-2 flex items-center gap-2 text-base font-medium rounded"
      v-bind="$attrs"
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
})
</script>

<style lang="scss" scoped></style>
