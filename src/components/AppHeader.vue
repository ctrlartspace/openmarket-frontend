<template>
  <nav>
    <ul>
      <li
        class="inline ml-4 first:ml-0"
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            class="font-semibold text-lg"
            :class="isActive ? 'text-black' : 'text-gray-300'"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue"

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
    title: "Возврат",
    path: "/returns",
  },
  {
    title: "Поступления",
    path: "/income",
  },
  {
    title: "База",
    path: "/base",
  },
])
</script>

<style scoped></style>
