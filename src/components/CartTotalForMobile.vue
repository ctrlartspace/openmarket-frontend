<template>
  <div v-if="!store.isEmpty" class="absolute bottom-0 left-0 right-0 p-4">
    <div
      v-if="cartStep === 2"
      class="pointer-events-auto relative rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
    >
      <div class="absolute">
        <button class="flex items-center" @click="stepBack">
          <span class="material-symbols-rounded text-xl text-gray-300"
            >arrow_back_ios</span
          >
        </button>
      </div>
      <p class="mb-2 text-center text-gray-300">Способ оплаты</p>
      <div
        class="grid transition-all"
        :class="
          store.getPaymentType.code === 'cash'
            ? 'mb-2 grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        "
      >
        <div class="flex gap-2 overflow-hidden">
          <input
            v-model="inputAmount"
            class="w-full appearance-none truncate rounded-xl bg-neutral-50 px-4 py-2 text-center font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-black focus:ring-0"
            placeholder="Внесено"
            type="text"
            inputmode="numeric"
          />
          <input
            class="w-full appearance-none truncate rounded-xl bg-neutral-50 px-4 py-2 text-center font-medium text-green-500 placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-black focus:ring-0"
            placeholder="Сдача"
            type="number"
            :value="cartChange"
            readonly
          />
        </div>
      </div>
      <button
        class="w-full rounded-xl bg-blue-100 px-4 py-2 font-medium text-blue-600"
        :class="{
          'bg-blue-100 text-blue-600': store.getPaymentType.code === 'online',
          'bg-red-100 text-red-600': store.getPaymentType.code === 'kaspi_qr',
          'bg-green-100 text-green-500': store.getPaymentType.code === 'cash',
        }"
        @click="store.changePaymentType"
        v-press
      >
        {{ store.getPaymentType.label }}
      </button>
    </div>

    <a-button-floating-text
      class="mt-2"
      rounded
      black
      @click="onNextClick"
      :disabled="isLoading"
    >
      <p v-if="cartStep === 1 && !isLoading" class="flex justify-center gap-4">
        <span
          >{{ store.getTotalAmount }} <span class="font-semibold">₸</span></span
        >
        <span class="material-symbols-rounded self-center font-bold"
          >arrow_forward</span
        >
      </p>
      <p v-if="cartStep === 2 && !isLoading">Готово</p>
      <span
        v-if="isLoading"
        class="material-symbols-rounded animate-spin font-medium"
        >progress_activity</span
      >
    </a-button-floating-text>
  </div>
</template>

<script setup>
import AButtonFloatingText from "./ui/AButtonFloatingText.vue"
import { computed, ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"

const store = useCartStore()
const { sendRequest, isLoading } = useApiRequest()

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : "",
)

const stepBack = () => {
  cartStep.value -= 1
}

const makeSaleFromCart = async () => {
  const response = await sendRequest("post", "/point/sales", {
    items: store.getItemsForSale,
    changeAmount: cartChange.value,
  })
  if (response) {
    store.clearCart()
    cartStep.value = 1
  }
}
const onNextClick = async () => {
  if (cartStep.value === 1) {
    cartStep.value = 2
    return
  }
  if (cartStep.value === 2) {
    await makeSaleFromCart()
    return
  }
}
</script>
