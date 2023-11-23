<template>
  <router-link
    v-for="(item, i) in menuItems"
    v-slot="{ isActive }"
    :to="item.path"
    :key="i"
  >
    <span
      class="font-semibold text-lg"
      :class="{
        'ml-4': i != 0,
        'text-black': isActive,
        'text-gray-300': !isActive,
      }"
    >
      {{ item.title }}
    </span>
  </router-link>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Продажи",
    path: "/sales",
  },
  {
    title: "База",
    path: "/base",
  },
])
</script>

<style scoped></style>
