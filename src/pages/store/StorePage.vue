<template>
  <base-page :menu-items="menuItems"> </base-page>
</template>

<script setup>
import { computed } from "vue"
import BasePage from "@/pages/BasePage.vue"
import { useUserStore } from "@/stores/user.store.js"

const store = useUserStore()

const menuItems = computed(() =>
  [
    {
      title: "Обзор магазина",
      path: "/store/info",
      permission: "view_stores",
    },
    {
      title: "Сотрудники",
      path: "/store/users",
      permission: "view_users",
    },
  ].filter((item) => store.hasPermission(item.permission)),
)
</script>

<style></style>
