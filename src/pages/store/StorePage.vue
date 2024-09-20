<template>
  <base-page :menu-items="menuItems" />
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"

const menuItems = ref([
  {
    title: "Точки продаж",
    path: "/store/points",
  },
  {
    title: "Сотрудники",
    path: "/store/users",
  },
  {
    title: "Товары",
    path: "/store/items",
  },
  {
    title: "Категории",
    path: "/store/filters",
  },
])
</script>

<style></style>
