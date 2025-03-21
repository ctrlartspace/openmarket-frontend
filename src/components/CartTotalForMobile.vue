<template>
  <div class="w-full bg-gray-100 px-6 py-6 pt-2 dark:bg-black">
    <div class="mb-2 flex gap-2 bg-gray-100 dark:bg-black">
      <button
        class="pointer-events-auto flex w-full items-center justify-between gap-2 truncate text-ellipsis whitespace-nowrap rounded-xl border border-gray-100 bg-white px-4 py-3 text-left text-gray-300 placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-600 md:pl-12"
        @click="onSearchClick"
      >
        Найти
        <span class="material-symbols-rounded">search</span>
      </button>
      <router-link
        v-press
        class="pointer-events-auto flex aspect-square h-[55px] items-center justify-center rounded-xl border border-gray-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 md:hidden"
        to="/scan2"
      >
        <span class="material-symbols-rounded text-black dark:text-neutral-200"
          >barcode_scanner</span
        >
      </router-link>
      <router-link
        v-press
        class="pointer-events-auto flex aspect-square h-[55px] items-center justify-center rounded-xl border border-gray-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:hidden"
        to="/cart/favorite"
      >
        <span class="material-symbols-rounded text-black dark:text-neutral-200"
          >star</span
        >
      </router-link>
      <router-link
        v-press
        class="pointer-events-auto flex aspect-square h-[55px] items-center justify-center rounded-xl border border-gray-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:hidden"
        to="/cart/free"
      >
        <span class="material-symbols-rounded text-black dark:text-neutral-200"
          >apps</span
        >
      </router-link>
    </div>
    <div
      class="flex w-full flex-col gap-4 rounded-xl bg-white px-6 py-6 dark:border dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="flex flex-col dark:text-neutral-200">
        <p v-if="!store.isEmpty" class="font-medium">
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
        <p v-else class="font-medium">Нет товаров в корзине</p>
        <p>
          <span class="text-gray-300 dark:text-neutral-400">{{
            store.getPaymentType.label
          }}</span>
        </p>
      </div>
      <div class="flex gap-2">
        <button
          v-press
          class="pointer-events-auto flex h-[55px] w-[55px] select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium dark:bg-neutral-800 dark:text-neutral-200"
          @click="store.changePaymentType"
        >
          <span class="material-symbols-rounded font-medium">
            {{ store.getPaymentType.icon }}
          </span>
        </button>

        <a-modal
          #="{ props }"
          :async-operation="store.makeSale"
          title="Подтвердить оплату?"
        >
          <a-button-floating-text black rounded v-bind="props">
            <span>Оплата</span>
          </a-button-floating-text>
        </a-modal>
        <discount-dialog #="{ props }">
          <button
            v-press
            :class="{
              'bg-rose-100 text-rose-500 dark:bg-rose-500/20 dark:text-rose-200':
                store.hasDiscount,
            }"
            class="pointer-events-auto flex h-[55px] w-[55px] select-none items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-center font-medium dark:bg-neutral-800 dark:text-neutral-200"
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
import { defineEmits } from "vue"
import { useCartStore } from "@/stores/cart.store"
import AModal from "@/components/ui/AModal.vue"
import { formatMoney } from "@/utils/format-money.js"

const emits = defineEmits(["onSearchClick"])

const store = useCartStore()

const onSearchClick = () => {
  emits("onSearchClick")
}
</script>
