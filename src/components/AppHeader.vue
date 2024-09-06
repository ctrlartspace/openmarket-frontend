<template>
  <nav v-if="store.isAuthorizedPoint">
    <!-- Desktop -->
    <ul class="w-full flex gap-4 border-b border-neutral-300 px-4 py-1">
      <li v-for="(item, i) in menuItems" :key="i" class="inline">
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium text-base"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
      <li class="ml-auto"></li>
      <li v-if="store.point" class="w-auto truncate inline text-pink-300">
        <router-link
          v-slot="{ isActive }"
          class="flex items-center gap-1"
          to="/point"
        >
          <span
            :class="isActive ? 'text-pink-500 ' : 'text-pink-300'"
            class="font-medium material-symbols-outlined"
            >pin_drop</span
          >
          <span
            :class="isActive ? 'text-pink-500 ' : 'text-pink-300'"
            class="font-medium text-base"
          >
            {{ store.point.name }}
          </span>
        </router-link>
      </li>
      <li class="inline">
        <router-link v-slot="{ isActive }" to="/store">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium text-base"
          >
            Магазин
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
  <nav v-else>
    <ul class="w-full flex gap-4 border-b border-neutral-300 px-4 py-1">
      <li class="ml-auto"></li>
      <li class="inline">
        <router-link v-slot="{ isActive }" to="/store">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium text-base"
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
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Касса",
    path: "/cash-register",
  },
  {
    title: "Продажи",
    path: "/sales",
  },
  {
    title: "Приход",
    path: "/arrivals",
  },
])
</script>

<style scoped></style>
