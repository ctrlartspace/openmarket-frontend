<template>
  <div>
    <div
      v-if="hasHeader()"
      class="flex items-center  px-4 py-1 bg-white border-b border-neutral-300"
    >
      <button class="font-medium text-gray-300 hover:text-black" @click="$router.back()">Назад</button>
      <h1 v-if="title" class="flex items-center  text-base font-medium"><span class="material-icons-outlined">arrow_right</span>{{ title
        }}</h1>
      <div class="ml-auto flex gap-4">
        <slot name="header"></slot>
      </div>
    </div>

    <div :class="{ 'p-0': noPadding, 'p-4': !noPadding }" class="pb-16">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from "vue"

defineProps({
  title: {
    type: String
  },
  noPadding: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()
const hasHeader = () => !!slots.header
</script>

<style lang="scss" scoped></style>
