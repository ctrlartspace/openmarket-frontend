<template>
  <v-container class="pa-0 container">
    <v-app>
      <header class="pa-2">
        <app-header></app-header>
      </header>
      <main class="pa-2 fill-height">
        <router-view></router-view>
      </main>
    </v-app>
  </v-container>
</template>
<script setup>
import AppHeader from "@/components/AppHeader.vue"
</script>
<style scoped>
.container {
  max-width: 800px;
}
</style>
