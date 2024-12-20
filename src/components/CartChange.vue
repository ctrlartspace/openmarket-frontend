<template>
  <div class="grid h-full grid-cols-10 bg-gray-100">
    <div
      id="keyboard-container"
      class="col-span-3 border-r border-t border-gray-100 bg-white p-4"
    ></div>
    <div class="col-span-7 flex items-end p-6">
      <div
        class="flex h-max w-full flex-col justify-between gap-2 rounded-xl border border-gray-100 bg-white p-4"
      >
        <div
          v-if="store.getPaymentType.code === 'cash'"
          class="flex flex-col gap-2"
        >
          <div class="grid grid-cols-1 gap-2">
            <p
              :class="cartChange > 0 ? 'text-black' : 'text-gray-300'"
              class="flex items-center gap-2 text-2xl font-medium"
            >
              <span class="material-symbols-rounded font-semibold"
                >arrow_forward</span
              >
              {{ formatMoney(cartChange) }}
              <span class="font-semibold">₸</span>
            </p>

            <input
              v-model="inputAmount"
              v-autofocus
              class="appearance-none rounded-xl border border-gray-100 px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
              placeholder="Внесено"
              type="text"
              @blur="isKeyboardVisible = false"
              @focus="isKeyboardVisible = true"
            />
          </div>
        </div>
        <div v-if="hasDiscount" class="flex flex-col gap-2">
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model="store.getTotalAmount"
              v-autofocus
              class="appearance-none rounded-xl border border-gray-100 px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
              placeholder="Цена со скидкой"
              type="text"
              @blur="isKeyboardVisible = false"
              @focus="isKeyboardVisible = true"
            />
            <div
              class="flex rounded-xl border border-gray-100 bg-white px-4 py-3"
            >
              <span class="flex-auto text-gray-300">Сдача</span>
              <span
                :class="cartChange > 0 ? 'text-black' : 'text-gray-300'"
                class="font-medium"
                >{{ cartChange }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-black transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
            @click="changePaymentType"
          >
            <span class="material-symbols-rounded text-3xl font-medium">
              {{ store.getPaymentType.icon }}
            </span>
          </button>
          <button
            class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-black transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
            @click="setDiscount"
          >
            <span
              :class="{ 'text-blue-600': hasDiscount }"
              class="material-symbols-rounded text-3xl font-medium"
            >
              percent
            </span>
          </button>
          <button
            :class="
              store.isEmpty
                ? 'bg-gray-100 text-gray-300'
                : 'bg-black text-white transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90'
            "
            :disabled="store.isEmpty || isLoading"
            class="flex flex-1 select-none items-center justify-between gap-4 rounded-xl px-6 py-4 text-2xl font-medium uppercase"
            @click="makeSaleFromCart"
          >
            <span
              v-if="isLoading"
              class="material-symbols-rounded animate-spin font-semibold"
              >progress_activity</span
            >
            <span v-else>Оплата</span>

            <span
              >{{ formatMoney(store.getTotalAmount) }}
              <span class="font-semibold">₸</span></span
            >
          </button>
        </div>
      </div>
    </div>
  </div>

  <teleport v-if="isKeyboardVisible" defer to="#keyboard-container">
    <a-number-keyboard v-model.number="inputAmount" />
  </teleport>
</template>

<script setup>
import ANumberKeyboard from "@/components/ui/ANumberKeyboard.vue"
import { computed, ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatMoney } from "@/utils/format-money"

const store = useCartStore()
const inputAmount = ref("")
const hasDiscount = ref(false)
const { sendRequest, isLoading } = useApiRequest()

const isKeyboardVisible = ref(false)

const makeSaleFromCart = async () => {
  const response = await sendRequest("post", "/point/sales", {
    items: store.getItemsForSale,
    changeAmount: cartChange.value,
  })
  if (response) {
    store.clearCart()
  }
}

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0,
)
const changePaymentType = () => {
  store.changePaymentType()
}

const setDiscount = () => {
  hasDiscount.value = !hasDiscount.value
}
</script>
