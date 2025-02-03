<template>
  <base-page :menu-items="menuItems">
    <template v-if="!isDesktop" #action>
      <button
        class="w-full text-center text-red-600 hover:text-black md:text-start md:text-gray-300"
        @click="store.logOutFromPoint()"
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
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm")
const store = useUserStore()

const menuItems = ref([
  {
    title: "Информация",
    path: "/point/info",
  },
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
