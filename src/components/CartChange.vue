<template>
  <div class="grid h-full grid-cols-10 bg-gray-100">
    <div
      id="keyboard-container"
      class="col-span-3 border-r border-t border-gray-100 bg-white p-4"
    ></div>
    <div class="col-span-7 flex items-end p-6">
      <div
        class="flex h-max w-full flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4"
      >
        <div
          v-if="store.getPaymentType.code === 'cash' || store.hasDiscount"
          class="flex flex-col gap-2"
        >
          <div class="flex gap-2">
            <p
              v-if="inputAmount"
              class="inline-flex w-max flex-col items-start rounded-xl bg-gray-50 px-4 py-2 font-medium"
            >
              <span class="text-sm"> Сдача </span>
              <span>
                {{ formatMoney(cartChange) }}
                <span class="font-semibold">₸</span>
              </span>
            </p>
            <button
              v-if="store.hasDiscount"
              v-press
              class="group relative inline-flex w-max flex-col items-start rounded-xl bg-rose-50 px-4 py-2 font-medium text-rose-500"
              @click="store.clearDiscount()"
            >
              <span class="text-sm"> Скидка </span>
              <span>
                {{ formatMoney(store.getDiscountAmount) }}
                <span class="font-semibold">₸</span>
              </span>

              <span
                class="material-symbols-rounded absolute right-0 top-0 px-2 py-2 text-[18px] opacity-0 transition-opacity group-hover:opacity-100"
                >close</span
              >
            </button>
          </div>

          <input
            v-if="store.getPaymentType.code === 'cash'"
            v-model="inputAmount"
            v-autofocus
            class="appearance-none rounded-xl border border-gray-100 px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
            placeholder="Внесено"
            type="text"
            @blur="isKeyboardVisible = false"
            @focus="isKeyboardVisible = true"
          />
        </div>
        <div class="flex gap-2">
          <button
            class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-black transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
            @click="changePaymentType"
          >
            <span class="material-symbols-rounded font-medium">
              {{ store.getPaymentType.icon }}
            </span>
          </button>
          <discount-dialog #="{ props }">
            <button
              :class="{ 'bg-rose-100 text-rose-500': store.hasDiscount }"
              class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-black transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90"
              v-bind="props"
            >
              <span class="material-symbols-rounded font-medium">
                percent
              </span>
            </button>
          </discount-dialog>

          <a-modal
            #="{ props }"
            :async-operation="makeSaleFromCart"
            title="Подтвердите оплату"
          >
            <button
              :class="
                store.isEmpty
                  ? 'bg-gray-100 text-gray-300'
                  : 'bg-black text-white transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90'
              "
              :disabled="store.isEmpty || isLoading"
              class="flex flex-1 select-none items-center justify-between gap-4 truncate rounded-xl px-6 py-4 font-medium uppercase"
              v-bind="props"
            >
              <span
                v-if="isLoading"
                class="material-symbols-rounded animate-spin font-semibold"
                >progress_activity</span
              >
              <span v-else>Оплата</span>

              <span>
                <span v-if="store.hasDiscount" class="ml-2"
                  >{{ formatMoney(store.getTotalDiscountAmount) }}
                  <span class="font-semibold">₸</span></span
                >
                <span v-else>
                  {{ formatMoney(store.getTotalAmount) }}
                  <span class="font-semibold">₸</span></span
                >
              </span>
            </button>
          </a-modal>
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
import DiscountDialog from "@/components/DiscountDialog.vue"
import AModal from "@/components/ui/AModal.vue"

const store = useCartStore()
const inputAmount = ref(null)
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
  inputAmount.value ? inputAmount.value - store.getTotalDiscountAmount : 0,
)
const changePaymentType = () => {
  store.changePaymentType()
  inputAmount.value = 0
}
</script>
