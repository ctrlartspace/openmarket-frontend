<template>
  <div
    class="flex text-xl font-semibold p-4 border rounded hover:brightness-95 cursor-pointer font-mono"
    :class="
      store.getTotalAmount
        ? 'bg-green-400 text-white border-green-600 shadow'
        : 'bg-gray-100 text-gray-300 border-gray-300'
    "
    @click="store.clearCart"
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
