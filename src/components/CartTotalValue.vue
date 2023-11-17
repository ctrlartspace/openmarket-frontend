<template>
  <div
    class="flex bg-green-400 text-white text-xl font-semibold p-4 border border-green-600 rounded hover:brightness-95 cursor-pointer font-mono shadow"
  >
    <span class="material-icons self-center">check_circle</span>
    <span class="ml-4 flex-auto"> {{ store.getTotalAmount }} </span>
    <span class="">KZT</span>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
//
</script>

<style scoped>
/*  */
</style>
