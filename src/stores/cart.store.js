import { defineStore } from "pinia"
import { ref, computed } from "vue"

import { items } from "@/utils/db"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([])

  const isEmpty = computed(() => cartItems.value.length === 0)

  const getTotalAmount = computed(() =>
    cartItems.value.reduce((acc, obj) => {
      return acc + obj["price"]
    }, 0)
  )

  const addItem = (id) => {
    const resultItem = items.find((item) => {
      return String(item.id) === String(id)
    })
    if (resultItem) {
      cartItems.value.push(resultItem)
    }
  }

  const removeItem = (index) => {
    cartItems.value.splice(index, 1)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return { cartItems, isEmpty, getTotalAmount, addItem, removeItem, clearCart }
})
