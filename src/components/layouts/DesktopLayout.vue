<template>
  <div
    class="mx-auto flex h-screen max-h-screen max-w-[900px] flex-col border-l border-r border-neutral-300 bg-white"
  >
    <app-header />
    <main class="flex w-full flex-1 overflow-hidden">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue"
</script>

<style lang="scss" scoped></style>
