<template>
  <nav v-if="store.isAuthorized">
    <!-- Desktop -->
    <ul class="w-full flex bg-white border px-4 py-2 rounded gap-4">
      <li class="inline" v-for="(item, i) in menuItems" :key="i">
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            class="font-medium text-base"
            :class="isActive ? 'text-black' : 'text-gray-300'"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
      <li class="inline ml-auto">
        <router-link v-slot="{ isActive }" to="/profile">
          <span
            class="font-medium text-base"
            :class="isActive ? 'text-black' : 'text-gray-300'"
          >
            Меню
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user.store"

const route = useRoute()
const store = useUserStore()
const isCollapsed = ref(false)

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Касса",
    path: "/cash",
  },
  {
    title: "Продажи",
    path: "/sales",
  },
  {
    title: "Поступления",
    path: "/incomes",
  },
  {
    title: "База",
    path: "/base",
  },
])
</script>

<style scoped></style>
