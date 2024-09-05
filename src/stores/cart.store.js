import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref(new Map())
  const paymentTypes = ref([
    { code: "card", label: "Перевод" },
    { code: "cash-register", label: "Наличные" },
  ])
  const currentPaymentType = ref(0)
  const getPaymentType = computed(
    () => paymentTypes.value[currentPaymentType.value],
  )

  const groupedCartItems = computed(() =>
    [...cartItems.value].map((el) => el[1]),
  )

  const isEmpty = computed(() => cartItems.value.size === 0)

  const getTotalAmount = computed(() =>
    groupedCartItems.value.reduce((total, item) => total + item.totalPrice, 0),
  )

  const getItemsForSale = computed(() =>
    groupedCartItems.value.map((item) => {
      return {
        pointItemId: item.id,
        sellingPrice: item.sellingPrice,
        count: item.count,
        paymentType: getPaymentType.value.code,
      }
    }),
  )

  const addItem = (item, count = 1) => {
    const existingItem = cartItems.value.get(item.id)
    if (existingItem) {
      existingItem.count += count
      existingItem.totalPrice = existingItem.count * existingItem.sellingPrice
    } else {
      cartItems.value.set(item.id, {
        ...item,
        count: count,
        totalPrice: item.sellingPrice,
      })
      console.log(item)
    }
  }

  const removeItem = (id) => {
    const item = cartItems.value.get(id)
    if (item && item.count > 1) {
      item.count -= 1
      item.totalPrice = item.count * item.sellingPrice
    } else {
      cartItems.value.delete(id)
    }
  }

  const clearCart = () => {
    cartItems.value.clear()
  }

  const changePaymentType = () => {
    currentPaymentType.value =
      currentPaymentType.value < paymentTypes.value.length - 1
        ? currentPaymentType.value + 1
        : 0
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
    changePaymentType,
    getPaymentType,
  }
})
