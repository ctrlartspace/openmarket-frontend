import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useApiRequest } from "@/composables/useApiRequest.js"
import { useModalStore } from "@/stores/modal.store.js"

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref(new Map())
  const paymentTypes = ref([
    { code: 1, label: "Наличный расчет", icon: "payments" },
    { code: 2, label: "Безналичный расчет", icon: "credit_card" },
  ])
  const currentPaymentType = ref(0)
  const discount = ref(0)
  const hasDiscount = ref(false)

  const getPaymentType = computed(
    () => paymentTypes.value[currentPaymentType.value],
  )

  const groupedCartItems = computed(() =>
    [...cartItems.value].map((el) => el[1]),
  )

  const itemsCount = computed(() => cartItems.value.size)
  const isEmpty = computed(() => itemsCount.value === 0)

  const getTotalAmount = computed(() =>
    Math.round(
      groupedCartItems.value.reduce(
        (total, item) => total + item.sellingPrice * item.count,
        0,
      ),
    ),
  )
  const getTotalDiscountAmount = computed(() =>
    Math.round(
      groupedCartItems.value.reduce(
        (total, item) => total + item.totalPrice,
        0,
      ),
    ),
  )

  const getItemsForSale = computed(() =>
    groupedCartItems.value.map((item) => {
      return {
        pointItemId: item.id,
        sellingPrice: item.totalPrice,
        count: item.count,
        paymentType: getPaymentType.value.code,
        comment: item.comment,
        discount: item.discount,
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
    applyDiscount()
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
    clearDiscount()
  }

  const changePaymentType = () => {
    currentPaymentType.value =
      currentPaymentType.value < paymentTypes.value.length - 1
        ? currentPaymentType.value + 1
        : 0
  }

  const applyDiscount = () => {
    cartItems.value.forEach((item, key) => {
      const roundDiscount = 1 - discount.value / 100
      const discountedPrice = item.sellingPrice * roundDiscount
      item.totalPrice = discountedPrice * item.count // Итоговая цена с учётом количества
      item.discount = Math.round(discount.value * 10) / 10 // Сохраняем текущую скидку
      cartItems.value.set(key, item) // Обновляем элемент в Map
      console.log(item.discount)
    })
    console.log(discount.value)
    hasDiscount.value = discount.value !== 0
  }

  const removeDiscount = (cartItem) => {
    const itemKey = `${cartItem.id}-${cartItem.sellingPrice}`
    const item = cartItems.value.get(itemKey)
    item.discount = 0
    item.totalPrice = item.sellingPrice * item.count
    cartItems.value.set(itemKey, item) // Обновляем элемент в Map
  }

  const setDiscount = (discountPercent) => {
    discount.value = discountPercent
  }

  const setDiscountByAmount = (amount) => {
    if (getTotalAmount.value > 0) {
      discount.value =
        ((getTotalAmount.value - amount) / getTotalAmount.value) * 100
    }
  }

  const getDiscountAmount = computed(
    () => getTotalAmount.value - getTotalDiscountAmount.value,
  )

  const clearDiscount = () => {
    setDiscount(0)
    applyDiscount()
    hasDiscount.value = false
  }

  const { sendRequest, isError, errorMessage } = useApiRequest()
  const modal = useModalStore()

  const makeSale = async () => {
    if (isEmpty.value) {
      return
    }
    const response = await sendRequest("post", "/point/sales", {
      items: getItemsForSale.value,
    })
    if (response) {
      clearCart()
    }
    if (isError.value) {
      modal.show("Ошибка", errorMessage.value)
    }
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
    paymentTypes,
    applyDiscount,
    setDiscount,
    hasDiscount,
    getDiscountAmount,
    getTotalDiscountAmount,
    discount,
    setDiscountByAmount,
    removeDiscount,
    clearDiscount,
    makeSale,
  }
})
