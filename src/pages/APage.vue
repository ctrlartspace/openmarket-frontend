<template>
  <div class="grid h-full w-full grid-cols-1 bg-gray-100 md:grid-cols-10">
    <div
      v-if="isDesktop"
      class="col-span-3 border-r border-gray-200 bg-gray-50/60"
    >
      <div v-if="title" class="border-b border-gray-100 bg-white px-4 py-1">
        <h1 class="font-medium">
          {{ title }}
        </h1>
      </div>
      <div class="flex flex-col gap-2 p-6">
        <slot name="header"></slot>
      </div>
    </div>
    <div
      class="no-scrollbar col-span-1 flex h-full w-full flex-col overflow-auto md:col-span-7"
    >
      <div
        v-if="hasError()"
        class="border-b border-gray-100 bg-white px-4 py-1"
      >
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
        :class="{ 'no-padding p-0': noPadding, 'p-6 pb-24': !noPadding }"
        class="no-scrollbar relative h-full w-full overflow-auto"
      >
        <slot></slot>
        <div
          :class="
            loading
              ? 'opacity-100 duration-[1000ms]'
              : 'pointer-events-none opacity-0 duration-200'
          "
          class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-100 transition-opacity will-change-auto"
        >
          <div class="flex h-full w-full flex-col gap-2 p-4">
            <div class="animate-pulse rounded-xl bg-gray-200 px-4 py-6"></div>
            <div
              class="h-full animate-pulse rounded-xl bg-gradient-to-b from-gray-200 to-gray-100 px-4 py-12 will-change-auto"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!isDesktop && hasFloating()"
      :class="{ 'bg-white': solidFloating, 'px-10 py-6': paddingFloating }"
      class="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-center"
    >
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
