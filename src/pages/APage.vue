<template>
  <div class="flex h-full w-full flex-col bg-gray-100">
    <div
      v-if="isDesktop && hasHeader()"
      class="flex items-center gap-4 overflow-x-auto overflow-y-hidden border-b border-gray-100 bg-white px-4 py-1"
    >
      <h1 v-if="title" class="flex items-center whitespace-nowrap font-medium">
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-4 whitespace-nowrap">
        <slot name="header"></slot>
      </div>
    </div>
    <div v-if="hasError()" class="border-b border-gray-100 bg-white px-4 py-1">
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
      :class="{ 'no-padding p-0': noPadding, 'p-6': !noPadding }"
      class="no-scrollbar relative h-full flex-1 overflow-auto pb-24 md:pb-4"
    >
      <slot></slot>
      <div
        :class="
          loading
            ? 'opacity-100 duration-[1000ms]'
            : 'pointer-events-none opacity-0 duration-200'
        "
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-100 transition-opacity"
      >
        <div class="flex h-full w-full flex-col gap-2 p-4">
          <div class="animate-pulse rounded-xl bg-gray-200 px-4 py-6"></div>
          <div
            class="h-full animate-pulse rounded-xl bg-gradient-to-b from-gray-200 to-gray-100 px-4 py-12 will-change-auto"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-if="!isDesktop && hasFloating()"
      :class="{ 'bg-white': solidFloating, 'px-10 py-6': paddingFloating }"
      class="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-center"
    >
      <!-- <div
        class="pointer-events-auto flex overflow-hidden whitespace-nowrap rounded-xl border border-gray-100 bg-white shadow-sm [&>*:first-child]:border-none [&>*]:rounded-none [&>*]:border-l [&>*]:border-gray-100"
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
