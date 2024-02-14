<template>
  <div
    class="bg-black text-white flex justify-center gap-4 font-semibold text-2xl p-4 rounded hover:brightness-50 cursor-pointer select-none shadow-lg"
    @click="makeSaleFromCart"
  >
    <span>{{ store.getTotalAmount }} KZT</span>
    <span class="material-icons self-center">arrow_forward</span>
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
