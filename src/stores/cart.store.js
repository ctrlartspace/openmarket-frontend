import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref(new Map())

  const groupedCartItems = computed(() =>
    [...cartItems.value].map((el) => el[1])
  )

  const isEmpty = computed(() => cartItems.value.size === 0)

  const getTotalAmount = computed(() =>
    groupedCartItems.value.reduce((total, item) => total + item.totalPrice, 0)
  )

  const getItemsForSale = computed(() =>
    groupedCartItems.value.map((item) => {
      return {
        item_id: item.id,
        selling_price: item.selling_price,
        count: item.count,
      }
    })
  )

  const addItem = (item) => {
    const existingItem = cartItems.value.get(item.id)
    if (existingItem) {
      existingItem.count += 1
      existingItem.totalPrice = existingItem.count * existingItem.selling_price
    } else {
      cartItems.value.set(item.id, {
        ...item,
        count: 1,
        totalPrice: item.selling_price,
      })
    }
  }

  const removeItem = (id) => {
    const item = cartItems.value.get(id)
    if (item && item.count > 1) {
      item.count -= 1
      item.totalPrice = item.count * item.selling_price
    } else {
      cartItems.value.delete(id)
    }
  }

  const clearCart = () => {
    cartItems.value.clear()
  }

  return {
    cartItems,
    groupedCartItems,
    isEmpty,
    getTotalAmount,
    getItemsForSale,
    addItem,
    removeItem,
    clearCart,
  }
})
