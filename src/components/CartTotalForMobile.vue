<template>
  <div v-if="!store.isEmpty" class="absolute bottom-0 left-0 right-0 p-4">
    <div
      v-if="cartStep === 2"
      class="relative rounded-xl border border-neutral-300 bg-white p-4 shadow-lg"
    >
      <div class="absolute">
        <button class="flex items-center" @click="stepBack">
          <span class="material-symbols-outlined text-xl text-gray-300"
            >arrow_back_ios</span
          >
        </button>
      </div>
      <p class="mb-2 text-center text-lg text-gray-300">Способ оплаты</p>
      <div
        class="flex flex-col gap-2 transition-[max-height,opacity] ease-in-out will-change-transform"
        :class="
          store.getPaymentType.code === 'cash'
            ? 'max-h-96 opacity-100 delay-75'
            : 'pointer-events-none max-h-0 opacity-0'
        "
      >
        <div
          class="flex items-center justify-between rounded-xl border border-neutral-300 bg-gray-100 px-4 py-2"
        >
          <span class="text-lg text-gray-300">Сдача</span>
          <span class="text-lg text-gray-300">{{ cartChange }} </span>
        </div>
        <input
          v-model="inputAmount"
          class="w-full appearance-none rounded-xl border border-neutral-300 px-4 py-2 text-center text-lg font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-black focus:ring-0"
          placeholder="Внесено"
          type="number"
        />
      </div>
      <button
        class="mt-2 w-full rounded-xl bg-blue-100 px-4 py-2 text-lg font-medium text-blue-600"
        :class="{
          'bg-blue-100 text-blue-600': store.getPaymentType.code === 'online',
          'bg-red-100 text-red-600': store.getPaymentType.code === 'kaspi-qr',
          'bg-green-100 text-green-600': store.getPaymentType.code === 'cash',
        }"
        @click="store.changePaymentType"
        v-press
      >
        {{ store.getPaymentType.label }}
      </button>
    </div>
    <button
      class="mt-2 flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-xl bg-black p-4 text-2xl font-medium text-white shadow-xl"
      @click="onNextClick"
      v-press
    >
      <p v-if="cartStep === 1 && !isLoading" class="flex justify-center gap-4">
        <span
          >{{ store.getTotalAmount }} <span class="font-semibold">₸</span></span
        >
        <span class="material-symbols-outlined self-center font-bold"
          >arrow_forward</span
        >
      </p>
      <p v-if="cartStep === 2 && !isLoading">Готово</p>
      <span
        v-if="isLoading"
        class="material-symbols-outlined animate-spin text-2xl font-medium"
        >progress_activity</span
      >
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"

const store = useCartStore()
const { sendRequest, isLoading } = useApiRequest()

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0,
)

const stepBack = () => {
  cartStep.value -= 1
}

const makeSaleFromCart = async () => {
  const response = await sendRequest("post", "/sales", store.getItemsForSale)
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
