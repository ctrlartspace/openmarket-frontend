<template>
  <div class="flex flex-col overflow-y-scroll h-full">
    <div
      v-if="hasHeader()"
      class="hidden md:flex items-center gap-4 px-4 py-1 bg-white border-b border-neutral-300"
    >
      <h1 v-if="title" class="flex items-center text-base font-medium">
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-2">
        <slot name="header"></slot>
      </div>
    </div>

    <div
      :class="{ 'p-0 no-padding': noPadding, 'p-4': !noPadding }"
      class="flex-1 overflow-auto"
    >
      <slot></slot>
    </div>

    <div
      v-if="hasHeader()"
      class="md:hidden z-30 flex items-center gap-4 px-4 py-2 bg-white border-t border-neutral-200 overflow-x-auto overflow-y-hidden"
    >
      <h1
        v-if="title"
        class="flex items-center text-base font-medium whitespace-nowrap"
      >
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-2 whitespace-nowrap">
        <slot name="header"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from "vue"

defineProps({
  title: {
    type: String,
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()
const hasHeader = () => !!slots.header
</script>

<style lang="scss" scoped></style>
