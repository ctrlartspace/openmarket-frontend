<template>
  <div class="max-w-[800px] mx-auto">
    <header class="p-2">
      <app-header></app-header>
    </header>
    <main class="p-2 h-full">
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import AppHeader from "@/components/AppHeader.vue"
</script>
<style scoped>
.container {
  max-width: 800px;
}
</style>
