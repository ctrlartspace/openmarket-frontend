import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([])

  const getTotalAmount = computed(() =>
    cartItems.value.reduce((acc, obj) => {
      return acc + obj["price"]
    }, 0)
  )

  const addItem = (item) => {
    cartItems.value.push(item)
  }

  const removeItem = (id) => {
    cartItems.value.remove(id)
  }

  return { cartItems, getTotalAmount, addItem, removeItem }
})
