<template>
  <div class="grid h-full grid-cols-10 bg-gray-100 dark:bg-black">
    <div
      id="keyboard-container"
      class="col-span-3 border-r border-t border-gray-100 bg-white p-4 dark:border-neutral-800 dark:bg-black"
    ></div>
    <div class="col-span-7 flex items-end p-6">
      <div
        class="flex h-max w-full flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="flex flex-1 flex-col">
          <p>
            <span class="text-gray-300 dark:text-neutral-400">{{
              store.getPaymentType.label
            }}</span>
          </p>
          <p
            v-if="!store.isEmpty"
            class="font-medium text-black dark:text-neutral-200"
          >
            Итого:
            <span>
              {{ " " + formatMoney(store.getTotalDiscountAmount) }}
              <span class="font-semibold">₸ </span>
              <span
                v-if="store.hasDiscount"
                class="ml-2 rounded bg-rose-50 px-2 py-1 text-rose-500 dark:bg-rose-500/20 dark:text-rose-200"
              >
                -{{ formatMoney(store.getDiscountAmount) }}
                <span class="font-semibold">₸</span>
              </span>
            </span>
          </p>
          <p v-else class="font-medium text-black dark:text-neutral-200">
            Нет товаров в корзине
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-black transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90 dark:bg-neutral-800 dark:text-neutral-200"
            @click="changePaymentType"
          >
            <span class="material-symbols-rounded font-medium">
              {{ store.getPaymentType.icon }}
            </span>
          </button>
          <discount-dialog #="{ props }">
            <button
              :class="{
                'bg-rose-100 text-rose-500 dark:bg-rose-500/20 dark:text-rose-200':
                  store.hasDiscount,
              }"
              class="flex aspect-square select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-black transition-all will-change-transform hover:brightness-95 active:scale-95 active:brightness-90 dark:bg-neutral-800 dark:text-neutral-200"
              v-bind="props"
            >
              <span class="material-symbols-rounded font-medium">
                percent
              </span>
            </button>
          </discount-dialog>

          <a-modal
            #="{ props }"
            :async-operation="store.makeSale"
            title="Подтвердить оплату?"
          >
            <button
              :class="
                store.isEmpty
                  ? 'bg-gray-100 text-gray-300 dark:bg-neutral-800 dark:text-neutral-600'
                  : 'bg-black text-white dark:border dark:border-neutral-800 dark:bg-black'
              "
              :disabled="store.isEmpty"
              class="flex w-full select-none items-center justify-center gap-4 truncate rounded-xl px-6 py-4 font-medium"
              v-bind="props"
            >
              <span>Оплата</span>
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
import { ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import DiscountDialog from "@/components/DiscountDialog.vue"
import AModal from "@/components/ui/AModal.vue"
import { formatMoney } from "@/utils/format-money.js"

const store = useCartStore()
const inputAmount = ref(null)

const isKeyboardVisible = ref(false)

const changePaymentType = () => {
  store.changePaymentType()
  inputAmount.value = 0
}
</script>
