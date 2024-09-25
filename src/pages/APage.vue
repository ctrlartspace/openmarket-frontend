<template>
  <div class="flex h-full flex-col overflow-y-scroll bg-neutral-100">
    <div
      v-if="hasHeader()"
      class="flex items-center gap-4 overflow-x-auto overflow-y-hidden border-b border-neutral-300 bg-white px-4 py-2 md:py-1"
    >
      <h1
        v-if="title"
        class="flex items-center whitespace-nowrap text-base font-medium"
      >
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-2 whitespace-nowrap">
        <slot name="header"></slot>
      </div>
    </div>

    <div
      :class="{ 'no-padding p-0': noPadding, 'p-4': !noPadding }"
      class="flex-1 overflow-auto"
    >
      <slot></slot>
    </div>

    <!-- <div
      v-if="hasHeader()"
      class="z-30 flex items-center gap-4 overflow-x-auto overflow-y-hidden border-t border-neutral-200 bg-white px-4 py-2 md:hidden"
    >
      <h1
        v-if="title"
        class="flex items-center whitespace-nowrap text-base font-medium"
      >
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-2 whitespace-nowrap">
        <slot name="header"></slot>
      </div>
    </div> -->
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
