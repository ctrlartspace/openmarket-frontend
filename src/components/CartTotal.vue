<template>
  <div
    class="flex cursor-pointer select-none justify-center gap-4 rounded-xl bg-black p-4 text-2xl font-medium text-white shadow-xl hover:brightness-50 active:brightness-50"
    @click="makeSaleFromCart"
  >
    <span>{{ store.getTotalAmount }} ₸</span>
    <span class="material-symbols-rounded self-center">arrow_forward</span>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.store"
import { makeSale } from "@/services/ItemSearch"

const store = useCartStore()

const makeSaleFromCart = async () => {
  const response = await makeSale(store.getItemsForSale)
  console.log(response)
  store.clearCart()
}

//
</script>

<style scoped>
/*  */
</style>
