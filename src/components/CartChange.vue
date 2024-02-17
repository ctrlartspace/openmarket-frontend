<template>
  <div>
    <div
      class="flex px-4 py-2 border rounded text-center font-semibold cursor-pointer select-none justify-center shadow"
      :class="{
        'bg-blue-600 text-white border-blue-800':
          store.getPaymentType.code === 'cash',
        'bg-red-600 text-white border-red-800':
          store.getPaymentType.code === 'card',
      }"
      @click="store.changePaymentType"
    >
      <span class="ml-2 text-lg"> {{ store.getPaymentType.label }} </span>
    </div>
    <div v-if="store.getPaymentType.code === 'cash'">
      <div class="relative">
        <input
          v-model="inputAmount"
          class="mt-2 mb-0 border border-gray-200 px-4 py-2 text-lg placeholder:font-normal placeholder:text-gray-300 appearance-none font-semibold rounded w-full focus:outline-2 focus:outline-black focus:bg-white"
          placeholder="Внесено"
          type="text"
        />
        <div
          v-if="inputAmount"
          class="absolute inset-y-0 top-2 right-2 flex items-center"
        >
          <span
            class="material-icons text-gray-400 hover:text-gray-800 cursor-pointer"
            @click="inputAmount = ''"
            >close</span
          >
        </div>
      </div>
      <div class="mt-2 px-4 py-2 border border-gray-200 rounded flex">
        <span class="text-lg text-gray-300 flex-auto">Сдача</span>
        <span class="text-lg font-semibold text-blue-600">{{
          cartChange
        }}</span>
      </div>
      <div
        class="hidden md:grid grid-cols-3 gap-2 mt-2 mb-2 font-semibold text-xl"
      >
        <div
          v-for="i in 9"
          class="py-2 bg-gray-100 text-gray-500 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200 select-none"
          @click="onKeyboardClick(i)"
          :key="i"
        >
          {{ i }}
        </div>
        <div
          class="py-2 bg-gray-100 text-gray-500 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200 select-none"
          @click="onKeyboardClick(0)"
        >
          0
        </div>
        <div
          class="col-start-2 col-end-4 py-2 bg-gray-100 text-red-600 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200 select-none"
          @click="onClearClick"
        >
          C
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
const inputAmount = ref("")

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
