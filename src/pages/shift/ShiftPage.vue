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
  {
    title: "Открытие смены",
    path: "/shift/add",
    hide: true,
  },
])
</script>

<style></style>
