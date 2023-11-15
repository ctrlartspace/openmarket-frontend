import { defineStore } from "pinia"
import { ref, computed } from "vue"

import { items } from "@/utils/db"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([])

  const getTotalAmount = computed(() =>
    cartItems.value.reduce((acc, obj) => {
      return acc + obj["price"]
    }, 0)
  )

  const addItem = (id) => {
    const resultItem = items.filter((item) => item.id === id)
    cartItems.value.push(resultItem)
  }

  const removeItem = (id) => {
    cartItems.value.remove(id)
  }

  return { cartItems, getTotalAmount, addItem, removeItem }
})
