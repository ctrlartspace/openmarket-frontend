<template>
  <base-page :menu-items="menuItems" />
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"

const menuItems = ref([
  {
    title: "Сотрудники",
    path: "/point/users",
  },
  {
    title: "Товары",
    path: "/point/items",
  },
  {
    title: "Продажи",
    path: "/point/sales",
  },
  {
    title: "Приход",
    path: "/point/arrivals",
  },
])
</script>

<style></style>
