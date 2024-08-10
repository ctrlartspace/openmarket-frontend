<template>
  <nav v-if="store.isAuthorizedPoint">
    <!-- Desktop -->
    <ul class="w-full flex gap-4 border-b border-neutral-300 px-4 py-1">
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
      <li class="ml-auto"></li>
      <li v-if="store.storePoint" class="w-auto truncate inline text-pink-300">
        <router-link v-slot="{ isActive }" to="/store/point">
          <span
            class="font-medium text-base"
            :class="isActive ? 'text-pink-500' : 'text-pink-300'"
          >
            {{ store.storePoint.name }}
          </span>
        </router-link>
      </li>
      <li class="inline">
        <router-link v-slot="{ isActive }" to="/store">
          <span
            class="font-medium text-base"
            :class="isActive ? 'text-black' : 'text-gray-300'"
          >
            Магазин
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
