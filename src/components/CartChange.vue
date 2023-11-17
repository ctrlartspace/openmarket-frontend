<template>
  <div
    class="px-2 mb-4 rounded border border-gray-400 cursor-pointer hover:bg-gray-100"
  >
    <div
      class="p-2 text-lg font-semibold text-center select-none"
      @click="onChangePaymentType"
    >
      {{ isCash ? "Наличные" : "Перевод" }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
const inputAmount = ref(null)
const isCash = ref(false)

const cartChange = computed(() => inputAmount.value - store.getTotalAmount)

const onChangePaymentType = () => {
  isCash.value = !isCash.value
}
</script>
