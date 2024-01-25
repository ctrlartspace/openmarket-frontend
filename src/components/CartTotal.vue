<template>
  <div
    class="flex justify-between font-semibold text-2xl p-4 border rounded hover:brightness-95 cursor-pointer"
    :class="
      store.getTotalAmount
        ? 'bg-green-400 text-white border-green-600 shadow'
        : 'bg-gray-100 text-gray-300 border-gray-300'
    "
    @click="makeSaleFromCart"
  >
    <!-- <span class="material-icons self-center">check_circle</span> -->
    <span>ИТОГО</span>
    <span>{{ store.getTotalAmount }} KZT</span>
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
