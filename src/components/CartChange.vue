<template>
  <div class="grid h-full grid-cols-10 bg-neutral-100">
    <div
      class="col-span-3 border-r border-t border-neutral-100 bg-white p-4"
      id="keyboard-container"
    ></div>
    <div class="col-span-7 flex items-end p-4">
      <div
        class="flex h-max w-full flex-col justify-between gap-2 rounded-xl border border-neutral-100 bg-white p-4"
      >
        <div
          v-if="store.getPaymentType.code === 'cash'"
          class="flex flex-col gap-2"
        >
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model="inputAmount"
              class="appearance-none rounded-xl border border-neutral-100 px-4 py-2 font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
              :class="inputAmount ? 'text-end' : 'text-start'"
              placeholder="Внесено"
              type="text"
              @blur="isKeyboardVisible = false"
              @focus="isKeyboardVisible = true"
              v-autofocus
            />
            <teleport v-if="isKeyboardVisible" to="#keyboard-container" defer>
              <a-number-keyboard v-model.number="inputAmount" />
            </teleport>
            <div
              class="flex rounded-xl border border-neutral-100 bg-white px-4 py-2"
            >
              <span class="flex-auto text-gray-300">Сдача</span>
              <span
                class="font-medium"
                :class="cartChange > 0 ? 'text-black' : 'text-gray-300'"
                >{{ cartChange }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl px-4 py-2 text-center font-medium transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
            :class="{
              'bg-blue-50 text-blue-600':
                store.getPaymentType.code === 'online',
              'bg-red-50 text-red-600':
                store.getPaymentType.code === 'kaspi_qr',
              'bg-green-50 text-green-500':
                store.getPaymentType.code === 'cash',
            }"
            @click="changePaymentType"
          >
            <span class="material-symbols-rounded text-3xl font-medium">
              {{ store.getPaymentType.icon }}
            </span>
          </button>
          <button
            class="flex flex-1 select-none items-center justify-between gap-4 rounded-xl bg-blue-100 px-6 py-4 text-2xl font-medium uppercase"
            :class="
              store.isEmpty
                ? 'bg-gray-100 text-gray-600'
                : 'bg-blue-100 text-blue-600 transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90'
            "
            @click="makeSaleFromCart"
            :disabled="store.isEmpty || isLoading"
          >
            <span
              >{{ store.getTotalAmount }}
              <span class="font-semibold">₸</span></span
            >
            <span
              v-if="isLoading"
              class="material-symbols-rounded animate-spin font-semibold"
              >progress_activity</span
            >
            <span v-else>Оплата</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ANumberKeyboard from "@/components/ui/ANumberKeyboard.vue"
import { ref, computed } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"

const store = useCartStore()
const inputAmount = ref("")
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
</script>
