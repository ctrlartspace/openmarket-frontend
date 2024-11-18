<template>
  <div class="mx-auto flex h-screen max-h-screen flex-col">
    <app-header />
    <main
      class="mx-auto flex w-full max-w-[900px] flex-1 overflow-hidden border-l border-r border-neutral-200"
    >
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue"
</script>

<style lang="scss" scoped></style>
