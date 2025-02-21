import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useApiRequest } from "@/composables/useApiRequest.js"
import { useModalStore } from "@/stores/modal.store.js"

export const useCartStore = defineStore("cart", () => {
  // Состояние
  const cartItems = ref(new Map())
  const paymentTypes = ref([
    { code: 1, label: "Наличный расчет", icon: "payments" },
    { code: 2, label: "Безналичный расчет", icon: "credit_card" },
  ])
  const currentPaymentType = ref(0)
  const discount = ref(0)
  const hasDiscount = computed(() => discount.value > 0)

  // Вычисляемые свойства
  const getPaymentType = computed(
    () => paymentTypes.value[currentPaymentType.value],
  )
  const groupedCartItems = computed(() => [...cartItems.value.values()])
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

  const getDiscountAmount = computed(
    () => getTotalAmount.value - getTotalDiscountAmount.value,
  )

  const getItemsForSale = computed(() =>
    groupedCartItems.value.map((item) => ({
      pointItemId: item.id,
      sellingPrice: item.totalPrice,
      count: item.count,
      paymentType: getPaymentType.value.code,
      comment: item.comment,
      discount: item.discount,
    })),
  )

  // Вспомогательная функция для округления
  const roundTo = (number, decimals = 0) =>
    Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)

  // Методы управления корзиной
  const addItem = (item, count = 1) => {
    const itemKey = `${item.id}-${item.sellingPrice}`
    const existingItem = cartItems.value.get(itemKey)

    if (existingItem) {
      existingItem.count += count
      existingItem.totalPrice = existingItem.count * existingItem.sellingPrice
    } else {
      cartItems.value.set(itemKey, {
        ...item,
        count,
        totalPrice: item.sellingPrice * count,
        discount: 0,
      })
    }
    applyDiscount() // Оставляем здесь, так как это связано с добавлением товара
  }

  const removeItem = (cartItem) => {
    const itemKey = `${cartItem.id}-${cartItem.sellingPrice}`
    const item = cartItems.value.get(itemKey)
    if (!item) return

    if (item.count > 1) {
      item.count -= 1
      item.totalPrice = item.count * item.sellingPrice
      cartItems.value.set(itemKey, item)
    } else {
      cartItems.value.delete(itemKey)
    }
    applyDiscount() // Оставляем здесь, так как это связано с удалением товара
  }

  const clearCart = () => {
    cartItems.value.clear()
    clearDiscount()
  }

  // Методы оплаты
  const changePaymentType = () => {
    currentPaymentType.value =
      (currentPaymentType.value + 1) % paymentTypes.value.length
  }

  // Методы скидок
  const applyDiscount = (targetAmount = null) => {
    if (!cartItems.value.size) return

    if (targetAmount === null) {
      // Применение скидки по проценту
      const discountMultiplier = 1 - discount.value / 100
      cartItems.value.forEach((item, key) => {
        const basePrice = item.sellingPrice * item.count
        item.totalPrice =
          discount.value > 0
            ? roundTo(basePrice * discountMultiplier)
            : basePrice
        item.discount = discount.value > 0 ? roundTo(discount.value, 1) : 0
        cartItems.value.set(key, item)
      })
    } else {
      // Применение скидки по целевой сумме
      const totalBasePrice = getTotalAmount.value
      const totalDiscountedPrice = targetAmount
      const discountMultiplier = totalDiscountedPrice / totalBasePrice

      let remainingTotal = totalDiscountedPrice
      cartItems.value.forEach((item, key, map) => {
        const basePrice = item.sellingPrice * item.count
        if (map.size === 1 || key === [...map.keys()].pop()) {
          item.totalPrice = remainingTotal
        } else {
          item.totalPrice = roundTo(basePrice * discountMultiplier)
          remainingTotal -= item.totalPrice
        }
        item.discount = roundTo((1 - item.totalPrice / basePrice) * 100, 1)
        cartItems.value.set(key, item)
      })
    }
  }

  const setDiscount = (discountPercent) => {
    discount.value = Math.max(0, Math.min(100, discountPercent))
    // Не вызываем applyDiscount, ждём явного вызова
  }

  const setDiscountByAmount = (amount) => {
    if (
      getTotalAmount.value <= 0 ||
      amount < 0 ||
      amount > getTotalAmount.value
    )
      return
    discount.value =
      ((getTotalAmount.value - amount) / getTotalAmount.value) * 100
    // Не вызываем applyDiscount, ждём явного вызова
  }

  const removeDiscount = (cartItem) => {
    const itemKey = `${cartItem.id}-${cartItem.sellingPrice}`
    const item = cartItems.value.get(itemKey)
    if (item) {
      item.discount = 0
      item.totalPrice = item.sellingPrice * item.count
      cartItems.value.set(itemKey, item)
      applyDiscount() // Здесь оставляем, чтобы пересчитать после удаления скидки
    }
  }

  const clearDiscount = () => {
    discount.value = 0
    applyDiscount()
  }

  // API методы
  const { sendRequest, isError, errorMessage } = useApiRequest()
  const modal = useModalStore()

  const makeSale = async () => {
    if (isEmpty.value) return
    const response = await sendRequest("post", "/point/sales", {
      items: getItemsForSale.value,
    })
    if (response) {
      clearCart()
    } else if (isError.value) {
      modal.show("Ошибка", errorMessage.value)
    }
  }

  return {
    cartItems,
    groupedCartItems,
    itemsCount,
    isEmpty,
    getTotalAmount,
    getTotalDiscountAmount,
    getDiscountAmount,
    getItemsForSale,
    addItem,
    removeItem,
    clearCart,
    changePaymentType,
    getPaymentType,
    paymentTypes,
    applyDiscount,
    setDiscount,
    setDiscountByAmount,
    removeDiscount,
    clearDiscount,
    makeSale,
    discount,
    hasDiscount,
  }
})
