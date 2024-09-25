<template>
  <base-page :menu-items="menuItems" />
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"

const menuItems = ref([
  {
    title: "Открытая касса",
    path: "/cash-register/active",
  },
  {
    title: "История",
    path: "/cash-register/archive",
  },
])
</script>

<style></style>
