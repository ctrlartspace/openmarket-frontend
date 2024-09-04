<template>
  <div>
    <div
      v-if="hasHeader()"
      class="flex items-center gap-4  px-4 py-1 bg-white border-b border-neutral-300"
    >
      <!--      <button class="flex items-center font-medium text-gray-300 hover:text-black" @click="$router.back()">-->
      <!--        <span class="material-symbols-outlined">arrow_back_ios</span>-->
      <!--      </button>-->
      <h1 v-if="title" class="flex items-center  text-base font-medium">
        {{ title }}
      </h1>
      <div class="ml-auto flex items-center gap-2">
        <slot name="header"></slot>
      </div>
    </div>

    <div :class="{ 'p-0': noPadding, 'p-4': !noPadding }" class="md:pb-4 pb-16">
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
