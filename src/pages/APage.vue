<template>
  <div class="flex h-full w-full flex-col bg-neutral-100">
    <div
      v-if="isDesktop && hasHeader()"
      class="flex items-center gap-4 overflow-x-auto overflow-y-hidden border-b border-neutral-100 bg-white px-4 py-3 md:py-1"
    >
      <h1 v-if="title" class="flex items-center whitespace-nowrap font-medium">
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-4 whitespace-nowrap">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="p-4 pb-0" v-if="hasError()">
      <div class="animate-shake">
        <p class="text-center text-red-500 md:text-start">
          <slot name="error"></slot>
        </p>
      </div>
    </div>
    <div v-if="hasTop()" class="bg-white p-4">
      <slot name="top"></slot>
    </div>
    <div
      :class="{ 'no-padding p-0': noPadding, 'p-4': !noPadding }"
      class="no-scrollbar relative h-full flex-1 overflow-auto pb-24 md:pb-4"
    >
      <slot></slot>
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-100 transition-opacity"
        :class="
          loading
            ? 'opacity-100 duration-[1000ms]'
            : 'pointer-events-none opacity-0 duration-200'
        "
      >
        <div class="flex h-full w-full flex-col gap-2 p-4">
          <div class="animate-pulse rounded-xl bg-neutral-200 px-4 py-6"></div>
          <div
            class="h-full animate-pulse rounded-xl bg-gradient-to-b from-neutral-200 to-neutral-100 px-4 py-12 will-change-auto"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-if="!isDesktop && hasFloating()"
      class="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-center"
      :class="{ 'bg-white': solidFloating, 'p-4': paddingFloating }"
    >
      <!-- <div
        class="pointer-events-auto flex overflow-hidden whitespace-nowrap rounded-xl border border-neutral-100 bg-white shadow-sm [&>*:first-child]:border-none [&>*]:rounded-none [&>*]:border-l [&>*]:border-neutral-100"
      >
        <slot name="floating" :floating="true"></slot>
      </div> -->
      <slot name="floating"></slot>
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
  loading: {
    type: Boolean,
    default: false,
  },
  solidFloating: {
    type: Boolean,
    default: false,
  },
  paddingFloating: {
    type: Boolean,
    default: true,
  },
})

const slots = useSlots()
const hasHeader = () => !!slots.header
const hasFloating = () => !!slots.floating
const hasError = () => !!slots.error
const hasTop = () => !!slots.top
</script>

<style lang="scss" scoped></style>
