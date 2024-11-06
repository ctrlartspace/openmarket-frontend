<template>
  <div class="grid h-full grid-cols-10 bg-neutral-100">
    <div class="col-span-3 border-r border-t border-neutral-300 bg-white p-4">
      <div
        v-if="store.getPaymentType.code === 'cash'"
        class="grid h-full grid-cols-3 gap-2"
      >
        <div
          v-for="i in 10"
          :key="i"
          class="bg-text-white rounded-lg bg-neutral-100 transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
          :class="
            i - 1 === 0
              ? 'order-last col-span-3 aspect-[unset] py-2'
              : 'aspect-square'
          "
        >
          <button class="h-full w-full text-2xl font-medium">
            {{ i - 1 }}
          </button>
        </div>
      </div>
    </div>
    <div class="col-span-7 h-full p-4">
      <div
        class="flex h-full flex-col justify-between gap-2 rounded-lg border border-neutral-300 bg-white p-4"
      >
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
            class="flex aspect-square h-full select-none items-center justify-center gap-2 rounded-lg px-4 py-2 text-center font-medium transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
            :class="{
              'bg-blue-50 text-blue-600':
                store.getPaymentType.code === 'online',
              'bg-red-50 text-red-600':
                store.getPaymentType.code === 'kaspi_qr',
              'bg-green-50 text-green-600':
                store.getPaymentType.code === 'cash',
            }"
            @click="store.changePaymentType"
          >
            <span class="material-symbols-outlined text-4xl">
              {{ store.getPaymentType.icon }}
            </span>
          </button>
          <button
            class="flex w-full select-none items-center justify-between gap-4 rounded-lg bg-blue-100 px-6 py-4 text-3xl font-medium uppercase"
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
            <span v-if="!isLoading" class="material-symbols-outlined text-4xl"
              >arrow_forward</span
            >
            <span v-else class="material-symbols-outlined animate-spin text-4xl"
              >progress_activity</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"

const store = useCartStore()
const inputAmount = ref("")
const { sendRequest, isLoading } = useApiRequest()

const makeSaleFromCart = async () => {
  const response = await sendRequest("post", "/sales", {
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

const onKeyboardClick = (value) => {
  inputAmount.value = inputAmount.value + "" + value
}
const onClearClick = () => {
  inputAmount.value = ""
}
</script>
