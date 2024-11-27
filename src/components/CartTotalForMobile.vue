<template>
  <div class="flex w-full flex-col gap-4 p-4">
    <div class="flex gap-2">
      <p class="pl-2 text-center font-medium">
        Итого: {{ formatMoney(store.getTotalAmount) }}
        <span class="font-semibold">₸ </span>
      </p>
      <p>
        <span class="text-neutral-300">{{ store.getPaymentType.label }}</span>
      </p>
    </div>
    <div class="flex gap-2">
      <button
        class="pointer-events-auto flex h-[55px] w-[55px] select-none items-center justify-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-center font-medium"
        @click="store.changePaymentType"
        v-press
      >
        <span class="material-symbols-rounded font-medium">
          {{ store.getPaymentType.icon }}
        </span>
      </button>
      <a-button-floating-text
        rounded
        black
        @click="makeSaleFromCart"
        :disabled="isLoading"
      >
        <span class="text-white">Оплата</span>
      </a-button-floating-text>
    </div>
  </div>
</template>

<script setup>
import AButtonFloatingText from "./ui/AButtonFloatingText.vue"
import { computed, ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatMoney } from "@/utils/format-money"

const store = useCartStore()
const { sendRequest, isLoading } = useApiRequest()

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : "",
)

const makeSaleFromCart = async () => {
  if (store.isEmpty) {
    return
  }
  const response = await sendRequest("post", "/point/sales", {
    items: store.getItemsForSale,
    changeAmount: cartChange.value,
  })
  if (response) {
    store.clearCart()
    cartStep.value = 1
  }
}
</script>
