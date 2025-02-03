<template>
  <base-page :menu-items="menuItems">
    <template v-if="!isDesktop" #action>
      <button
        class="w-full text-center text-red-600 hover:text-black md:text-start md:text-gray-300"
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
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useUserStore } from "@/stores/user.store.js"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm")
const store = useUserStore()

const menuItems = ref([
  {
    title: "Обзор магазина",
    path: "/store/info",
  },
  {
    title: "Сотрудники",
    path: "/store/users",
  },
])
</script>

<style></style>
