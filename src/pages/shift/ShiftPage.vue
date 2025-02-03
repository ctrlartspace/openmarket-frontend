<template>
  <base-page :menu-items="menuItems" />
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"

const menuItems = ref([
  {
    title: "Сегодня",
    path: "/work-shifts/last",
  },
  {
    title: "История",
    path: "/work-shifts/archive",
  },
  {
    title: "Открытие смены",
    path: "/work-shifts/add",
    hide: true,
  },
])
</script>

<style></style>
