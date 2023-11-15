import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([])

  const addItem = (item) => {
    cartItems.value.push(item)
  }

  const removeItem = (id) => {
    cartItems.value.remove(id)
  }

  return { cartItems, addItem, removeItem }
})
