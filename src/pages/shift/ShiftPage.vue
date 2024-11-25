<template>
  <base-page :menu-items="menuItems" />
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"

const menuItems = ref([
  {
    title: "Сегодня",
    path: "/shift/last",
  },
  {
    title: "История",
    path: "/shift/archive",
  },
])
</script>

<style></style>
