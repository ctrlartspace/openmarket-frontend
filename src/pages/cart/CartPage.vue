<template>
  <base-page :menu-items="menuItems">
    <template #bottom>
      <div class="border-t border-neutral-300">
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
    title: "Новая",
    path: "/cart/active",
  },
])
</script>

<style></style>
