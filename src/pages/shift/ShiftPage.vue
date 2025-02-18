<template>
  <base-page :menu-items="menuItems" />
</template>

<script setup>
import { computed } from "vue"
import BasePage from "@/pages/BasePage.vue"
import { useUserStore } from "@/stores/user.store.js"

const store = useUserStore()

const menuItems = computed(() =>
  [
    {
      title: "Сегодня",
      path: "/work-shifts/last",
      permission: "view_shifts",
    },
    {
      title: "История",
      path: "/work-shifts/archive",
      permission: "view_shifts",
    },
    {
      title: "Открытие смены",
      path: "/work-shifts/add",
      hide: true,
      permission: "view_shifts",
    },
  ].filter((item) => store.hasPermission(item.permission)),
)
</script>

<style></style>
