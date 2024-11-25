<template>
  <button
    :class="{
      'animate-pulse': loading,
      'text-neutral-800 hover:bg-neutral-100 hover:text-neutral-700': neutral,
      'text-blue-600 hover:bg-gray-50 hover:text-blue-700': primary,
      'text-red-600 hover:bg-gray-50 hover:text-red-700': danger,
      'text-yellow-600 hover:bg-gray-50 hover:text-yellow-700': info,
      'text-green-500 hover:bg-gray-50 hover:text-green-700': success,
      'text-pink-500 hover:bg-gray-50 hover:text-pink-700': accent,
      'bg-black text-white hover:bg-neutral-900': black,
      'w-full justify-center': block,
      'rounded-xl border': rounded,
    }"
    :disabled="loading"
    class="pointer-events-auto flex h-[55px] w-max items-center justify-center gap-2 border-b border-l border-t border-neutral-100 bg-white p-4 px-4 font-medium first:rounded-l-2xl last:rounded-r-2xl last:border-r"
    v-bind="$attrs"
    v-press
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
  neutral: { type: Boolean },
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
