<template>
  <div class="w-full">
    <div class="flex gap-2 bg-gray-100 px-6 py-4">
      <button
        class="pointer-events-auto w-full truncate text-ellipsis whitespace-nowrap rounded-xl border border-gray-100 bg-white px-4 py-3 text-left text-gray-300 placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 md:pl-12"
        @click="onSearchClick"
      >
        Найти
      </button>
      <router-link
        v-press
        class="pointer-events-auto flex aspect-square h-[55px] items-center justify-center rounded-xl border border-gray-100 bg-white md:hidden"
        to="/scan2"
      >
        <span class="material-symbols-rounded text-black"
          >center_focus_strong</span
        >
      </router-link>
      <router-link
        v-press
        class="pointer-events-auto flex aspect-square h-[55px] items-center justify-center rounded-xl border border-gray-100 bg-white md:hidden"
        to="/cart/favorite"
      >
        <span class="material-symbols-rounded text-black">star</span>
      </router-link>
      <router-link
        v-press
        class="pointer-events-auto flex aspect-square h-[55px] items-center justify-center rounded-xl border border-gray-100 bg-white md:hidden"
        to="/cart/free"
      >
        <span class="material-symbols-rounded text-black">apps</span>
      </router-link>
    </div>
    <div class="flex w-full flex-col gap-4 px-6 py-6">
      <div class="flex flex-col">
        <p class="font-medium">
          Итого:
          <span>
            {{ " " + formatMoney(store.getTotalDiscountAmount) }}
            <span class="font-semibold">₸ </span>
            <span
              v-if="store.hasDiscount"
              class="rounded bg-rose-50 px-2 py-1 text-rose-500"
            >
              -{{ formatMoney(store.getDiscountAmount) }}
              <span class="font-semibold">₸</span>
            </span>
          </span>
        </p>
        <p>
          <span class="text-gray-300">{{ store.getPaymentType.label }}</span>
        </p>
      </div>
      <div class="flex gap-2">
        <button
          v-press
          class="pointer-events-auto flex h-[55px] w-[55px] select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium"
          @click="store.changePaymentType"
        >
          <span class="material-symbols-rounded font-medium">
            {{ store.getPaymentType.icon }}
          </span>
        </button>

        <a-modal
          #="{ props }"
          :async-operation="makeSaleFromCart"
          title="Подтвердите оплату"
        >
          <a-button-floating-text
            :disabled="isLoading"
            black
            rounded
            v-bind="props"
          >
            <span class="text-white">Оплата</span>
          </a-button-floating-text>
        </a-modal>
        <discount-dialog #="{ props }">
          <button
            v-press
            :class="{ 'bg-rose-100 text-rose-500': store.hasDiscount }"
            class="pointer-events-auto flex h-[55px] w-[55px] select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium"
            v-bind="props"
          >
            <span class="material-symbols-rounded font-medium"> percent </span>
          </button>
        </discount-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import AButtonFloatingText from "./ui/AButtonFloatingText.vue"
import DiscountDialog from "@/components/DiscountDialog.vue"
import { computed, defineEmits, ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatMoney } from "@/utils/format-money"
import AModal from "@/components/ui/AModal.vue"

const emits = defineEmits(["onSearchClick"])

const store = useCartStore()
const { sendRequest, isLoading } = useApiRequest()

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : "",
)

const makeSaleFromCart = async () => {
  if (store.isEmpty) {
    return
  }
  const response = await sendRequest("post", "/point/sales", {
    items: store.getItemsForSale,
    changeAmount: cartChange.value,
  })
  if (response) {
    store.clearCart()
    cartStep.value = 1
  }
}

const onSearchClick = () => {
  emits("onSearchClick")
}
</script>
