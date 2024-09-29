<template>
  <base-page :menu-items="menuItems">
    <template #action>
      <button
        class="w-full text-center text-lg text-red-600 hover:text-black md:text-start md:text-base md:text-gray-300"
        @click="store.logOut()"
      >
        Завершить работу
      </button>
    </template>
  </base-page>
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()

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
