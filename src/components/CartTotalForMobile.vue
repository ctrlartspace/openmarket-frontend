<template>
  <div
    v-if="!store.isEmpty"
    class="absolute bottom-0 left-0 right-0 p-4 mb-safe"
  >
    <button
      v-if="cartStep === 1"
      class="flex w-full cursor-pointer select-none justify-center gap-4 rounded-xl bg-black p-4 text-2xl font-medium text-white shadow-xl hover:brightness-50 active:brightness-50"
      @click.once="stepForward"
    >
      <span>{{ store.getTotalAmount }} KZT</span>
      <span class="material-icons self-center font-bold">arrow_forward</span>
    </button>
    <div
      v-if="cartStep === 2"
      class="relative rounded-xl border border-neutral-300 bg-white p-4 shadow-lg"
    >
      <div class="absolute">
        <button class="flex items-center" @click="stepBack">
          <span class="material-icons-outlined text-xl text-gray-300"
            >arrow_back_ios</span
          >
        </button>
      </div>
      <p class="mb-2 text-center text-lg text-gray-300">Тип оплаты</p>
      <div
        v-if="store.getPaymentType.code === 'cash'"
        class="flex flex-col gap-2"
      >
        <button
          class="w-full rounded-xl bg-blue-100 px-4 py-2 text-lg font-medium text-blue-600"
          @click="store.changePaymentType"
        >
          {{ store.getPaymentType.label }}
        </button>
        <div
          class="flex items-center justify-between rounded-xl border border-neutral-300 bg-gray-100 px-4 py-2"
        >
          <span class="text-lg text-gray-300">Сдача</span>
          <span class="text-lg text-gray-300">{{ cartChange }} KZT</span>
        </div>
        <input
          v-model="inputAmount"
          class="w-full appearance-none rounded-xl border border-neutral-300 px-4 py-2 text-center text-lg font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
          placeholder="Внесено"
          type="number"
        />
      </div>
      <div v-else>
        <button
          class="w-full rounded-xl bg-blue-100 px-4 py-2 text-lg font-medium text-blue-600"
          @click="store.changePaymentType"
        >
          {{ store.getPaymentType.label }}
        </button>
      </div>
    </div>
    <button
      v-if="cartStep === 2"
      class="mt-2 flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-xl bg-black p-4 text-2xl font-medium text-white shadow-xl hover:brightness-50 active:brightness-50"
      @click.once="makeSaleFromCart"
    >
      <span>Готово</span>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { makeSale } from "@/services/ItemSearch"

const store = useCartStore()

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0,
)

const stepBack = () => {
  cartStep.value -= 1
}
const stepForward = () => {
  cartStep.value += 1
}

const makeSaleFromCart = async () => {
  if (!store.isEmpty) {
    const response = await makeSale(store.getItemsForSale)
    store.clearCart()
    cartStep.value = 1
  }
}
</script>
