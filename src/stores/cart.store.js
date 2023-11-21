import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([])

  const isEmpty = computed(() => cartItems.value.length === 0)

  const getTotalAmount = computed(() =>
    cartItems.value.reduce((acc, obj) => {
      return acc + obj["selling_price"]
    }, 0)
  )

  const addItem = (item) => {
    cartItems.value.push(item)
  }

  const removeItem = (index) => {
    cartItems.value.splice(index, 1)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return { cartItems, isEmpty, getTotalAmount, addItem, removeItem, clearCart }
})
