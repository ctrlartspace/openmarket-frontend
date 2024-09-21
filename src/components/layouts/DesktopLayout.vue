<template>
  <div
    class="flex flex-col max-w-[800px] mx-auto h-screen max-h-screen bg-white border-l border-r border-neutral-300"
  >
    <app-header />
    <main class="flex-1 flex overflow-hidden bg-neutral-100">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue"
</script>

<style lang="scss" scoped></style>
