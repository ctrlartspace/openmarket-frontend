<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-center font-medium cursor-pointer select-none justify-center"
      @click="store.changePaymentType"
    >
      <span class="material-icons-outlined text-[28px]">
        {{ store.getPaymentType.code === "cash" ? "payments" : "credit_card" }}
      </span>
      {{ store.getPaymentType.label }}
    </div>
    <div class="relative">
      <input
        v-model="inputAmount"
        class="border border-gray-200 px-4 py-2 text-lg md:text-base placeholder:font-normal placeholder:text-gray-300 appearance-none font-medium rounded w-full focus:outline-2 focus:outline-black focus:bg-white"
        :class="inputAmount ? 'text-end' : 'text-start'"
        placeholder="Внесено"
        type="text"
      />
      <!-- <div
        v-if="inputAmount"
        class="absolute inset-y-0 right-0 flex items-center"
      >
        <span
          class="material-icons text-gray-400 hover:text-gray-800 active:text-gray-800 cursor-pointer text-[28px]"
          @click="inputAmount = ''"
          >close</span
        >
      </div> -->
    </div>
    <div class="px-4 py-2 border border-gray-200 rounded flex">
      <span class="text-lg md:text-base text-gray-300 flex-auto">Сдача</span>
      <span class="text-lg md:text-base font-medium">{{ cartChange }}</span>
    </div>
    <button
      class="mt-2 w-full bg-black text-white flex justify-center gap-4 font-medium p-4 text-2xl rounded hover:brightness-90 active:brightness-50 cursor-pointer select-none"
      @click="makeSaleFromCart"
    >
      <span>{{ store.getTotalAmount }} KZT</span>
      <span class="material-icons self-center font-semibold"
        >arrow_forward</span
      >
    </button>
    <!-- <div
        class="hidden md:grid grid-cols-3 gap-2 mt-2 mb-2 font-medium text-base"
      >
        <div
          v-for="i in 9"
          class="py-2 bg-gray-100 text-gray-500 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200 active:bg-gray-200 select-none"
          @click="onKeyboardClick(i)"
          :key="i"
        >
          {{ i }}
        </div>
        <div
          class="py-2 bg-gray-100 text-gray-500 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200 active:bg-gray-200 select-none"
          @click="onKeyboardClick(0)"
        >
          0
        </div>
        <div
          class="col-start-2 col-end-4 py-2 bg-gray-100 text-red-600 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200 active:bg-gray-200 select-none"
          @click="onClearClick"
        >
          C
        </div>
      </div> -->
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
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0
)

const onKeyboardClick = (value) => {
  inputAmount.value = inputAmount.value + "" + value
}
const onClearClick = () => {
  inputAmount.value = ""
}
</script>
