<template>
  <div class="grid h-full grid-cols-10 bg-neutral-100">
    <div class="col-span-3 border-r border-neutral-300 bg-white p-4">
      <div
        v-if="store.getPaymentType.code === 'cash'"
        class="grid h-full grid-cols-3 gap-2"
      >
        <div
          v-for="i in 10"
          :key="i"
          class="bg-text-white aspect-square rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
          :class="{ 'order-last col-span-3 aspect-[3/1] py-2': i - 1 === 0 }"
        >
          <button class="h-full w-full text-2xl font-medium">
            {{ i - 1 }}
          </button>
        </div>
      </div>
    </div>
    <div class="col-span-7 flex flex-col gap-2 bg-white p-4">
      <div
        v-if="store.getPaymentType.code === 'cash'"
        class="flex flex-col gap-2"
      >
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="inputAmount"
            class="appearance-none rounded-lg border border-neutral-300 px-4 py-2 text-lg font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black md:text-base"
            :class="inputAmount ? 'text-end' : 'text-start'"
            placeholder="Внесено"
            type="text"
          />
          <div
            class="flex rounded-lg border border-neutral-300 bg-white px-4 py-2"
          >
            <span class="flex-auto text-base text-gray-300">Сдача</span>
            <span
              class="text-base font-medium"
              :class="cartChange > 0 ? 'text-black' : 'text-gray-300'"
              >{{ cartChange }}</span
            >
          </div>
        </div>
        <textarea
          class="rounded-lg border border-neutral-300 px-4 py-2 placeholder:text-gray-300"
          rows="2"
          placeholder="Комментарий"
        ></textarea>
      </div>
      <div class="mt-auto flex gap-2">
        <button
          class="flex aspect-square h-full select-none items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white hover:brightness-90 active:brightness-50"
          :class="{
            'bg-blue-500 text-white': store.getPaymentType.code === 'online',
            'bg-red-500 text-white': store.getPaymentType.code === 'kaspi-qr',
            'bg-green-500 text-white': store.getPaymentType.code === 'cash',
          }"
          @click="store.changePaymentType"
        >
          <span class="material-symbols-outlined text-3xl">
            {{ store.getPaymentType.icon }}
          </span>
        </button>
        <button
          class="flex w-full select-none items-center justify-between gap-4 rounded-lg bg-black px-6 py-4 text-2xl font-medium uppercase text-white hover:brightness-90 active:brightness-50"
          @click="makeSaleFromCart"
        >
          <span
            >ИТОГО: {{ store.getTotalAmount }}
            <span class="font-semibold">₸</span></span
          >
          <span class="material-symbols-outlined text-4xl">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { makeSale } from "@/services/ItemSearch"

const store = useCartStore()
const inputAmount = ref("")

const makeSaleFromCart = async () => {
  await makeSale(store.getItemsForSale)

  store.clearCart()
}

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0,
)

const onKeyboardClick = (value) => {
  inputAmount.value = inputAmount.value + "" + value
}
const onClearClick = () => {
  inputAmount.value = ""
}
</script>
