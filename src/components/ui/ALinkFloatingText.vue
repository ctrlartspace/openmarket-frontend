<template>
  <router-link
    class="flex w-screen items-center justify-center"
    custom
    v-bind="$props"
  >
    <button
      v-press
      :class="{
        'animate-pulse': loading,
        'bg-white text-gray-800': gray && !solid,
        'bg-white text-blue-600 dark:bg-neutral-900 dark:text-blue-400':
          primary && !solid,
        'bg-white text-red-600': danger && !solid,
        'bg-white text-yellow-600': info && !solid,
        'bg-white text-green-500': success && !solid,
        'bg-white text-pink-500': accent && !solid,
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
      class="pointer-events-auto flex h-[55px] w-full items-center justify-center gap-2 border-b border-l border-t border-gray-100 p-4 font-medium shadow-2xl shadow-gray-500/10 first:rounded-l-xl last:rounded-r-xl last:border-r dark:border-neutral-800"
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
