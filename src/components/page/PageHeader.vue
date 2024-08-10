<template>
  <div
    v-if="title"
    class="flex justify-between px-4 py-1 bg-white border-b border-neutral-300"
  >
    <h1 class="font-medium">{{ title }}</h1>
    <div class="flex gap-2">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["title"])
</script>

<style lang="scss" scoped></style>
