<template>
  <div class="relative flex h-full flex-col bg-neutral-100">
    <div
      v-if="isDesktop && hasHeader()"
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
      class="relative flex-1 overflow-auto pb-20"
    >
      <slot></slot>
    </div>
    <div
      v-if="!isDesktop && hasFloating()"
      class="absolute bottom-0 right-0 p-4"
    >
      <div
        class="flex overflow-hidden whitespace-nowrap rounded-lg border border-neutral-300 bg-white shadow-sm"
      >
        <slot name="floating" :floating="true"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

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
const hasFloating = () => !!slots.floating
</script>

<style lang="scss" scoped></style>
