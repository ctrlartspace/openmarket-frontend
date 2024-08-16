<template>
  <div>
    <div
      v-if="hasHeader()"
      class="flex px-4 py-1 bg-white border-b border-neutral-300"
    >
      <h1 class="text-base font-medium" v-if="title">{{ title }}</h1>
      <div class="ml-auto flex gap-4">
        <slot name="header"></slot>
      </div>
    </div>

    <div class="pb-16" :class="{ 'p-0': noPadding, 'p-4': !noPadding }">
      <slot></slot>
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
