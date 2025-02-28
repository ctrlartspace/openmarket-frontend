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
      '!bg-black text-white hover:bg-gray-900': black,
      'w-full justify-center': block,
      'rounded-xl border': rounded,
    }"
    :disabled="loading"
    class="pointer-events-auto ml-2 flex h-[55px] w-[55px] items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4 px-4 font-medium first:ml-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
    v-bind="$attrs"
  >
    <span v-if="loading" class="material-symbols-rounded animate-spin">
      progress_activity
    </span>
    <span v-else class="material-symbols-rounded">
      <slot> </slot>
    </span>
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
