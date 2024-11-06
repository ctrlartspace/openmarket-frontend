<template>
  <base-page :menu-items="menuItems"> </base-page>
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"

const menuItems = ref([
  {
    title: "Новый магазин",
    path: "/store-create/user-info",
  },
])
</script>

<style></style>
