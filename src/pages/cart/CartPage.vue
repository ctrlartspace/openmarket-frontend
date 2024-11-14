<template>
  <base-page :menu-items="menuItems">
    <template #bottom>
      <div>
        <cart-change></cart-change>
      </div>
    </template>
  </base-page>
</template>

<script setup>
import { ref } from "vue"
import BasePage from "@/pages/BasePage.vue"
import CartChange from "@/components/CartChange.vue"

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart/active",
  },
  {
    title: "Быстрые товары",
    path: "/cart/favorite",
  },
])
</script>

<style></style>
