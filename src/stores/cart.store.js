import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref(new Map())
  const paymentTypes = ref([
    { code: "online", label: "Перевод", icon: "smartphone", color: "blue" },
    { code: "kaspi_qr", label: "Kaspi QR", icon: "qr_code", color: "red" },
    { code: "cash", label: "Наличные", icon: "payments", color: "green" },
  ])
  const currentPaymentType = ref(0)
  const getPaymentType = computed(
    () => paymentTypes.value[currentPaymentType.value],
  )

  const groupedCartItems = computed(() =>
    [...cartItems.value].map((el) => el[1]),
  )

  const itemsCount = computed(() => cartItems.value.size)
  const isEmpty = computed(() => itemsCount.value === 0)

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
        comment: item.comment,
      }
    }),
  )

  const addItem = (item, count = 1) => {
    const itemKey = `${item.id}-${item.sellingPrice}`

    const existingItem = cartItems.value.get(itemKey)
    if (existingItem) {
      existingItem.count += count
      existingItem.totalPrice = existingItem.count * existingItem.sellingPrice
    } else {
      cartItems.value.set(itemKey, {
        ...item,
        count: count,
        totalPrice: item.sellingPrice,
      })
    }
  }

  const removeItem = (cartItem) => {
    const itemKey = `${cartItem.id}-${cartItem.sellingPrice}`
    const item = cartItems.value.get(itemKey)
    if (item && item.count > 1) {
      item.count -= 1
      item.totalPrice = item.count * item.sellingPrice
    } else {
      cartItems.value.delete(itemKey)
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
    itemsCount,
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
