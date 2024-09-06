<template>
  <div class="grid gap-4 grid-cols-10 h-full">
    <div class="col-span-6">
      <slot name="left"></slot>
    </div>
    <div class="col-span-4">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
