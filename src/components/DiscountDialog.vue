<template>
  <a-modal title="Скидка на покупку" @handle="onDiscountDialogOpen">
    <template #default="{ props }">
      <slot :props="props"></slot>
    </template>
    <template #content="{ closeModal }">
      <form
        class="flex flex-col gap-2"
        @submit.prevent="store.applyDiscount(), closeModal()"
      >
        <div class="no-scrollbar flex gap-2 overflow-auto">
          <button
            v-for="(n, i) in 21"
            v-press
            :class="{
              '!border-rose-500': i * 5 === store.discount,
            }"
            class="flex items-center justify-center rounded-xl border-2 border-rose-100 bg-rose-100 px-4 py-2 font-medium text-rose-500 hover:brightness-95"
            type="button"
            @click="
              store.setDiscount(i * 5), store.applyDiscount(), closeModal()
            "
          >
            {{ i * 5 }}%
          </button>
        </div>
        <input
          v-model="totalAmountWithDiscount"
          v-autofocus
          class="appearance-none rounded-xl border border-gray-100 px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
          inputmode="numeric"
          placeholder="Цена со скидкой"
          @input="onDiscountValueChange"
        />
        <button
          v-press
          class="pointer-events-auto mt-2 flex items-center justify-center rounded-xl border border-gray-100 px-4 py-3 font-medium text-rose-500 hover:brightness-95"
          type="submit"
        >
          Применить скидку
        </button>
      </form>
    </template>
  </a-modal>
</template>
<script setup>
import AModal from "@/components/ui/AModal.vue"
import { useCartStore } from "@/stores/cart.store.js"
import { ref } from "vue"

const store = useCartStore()
const totalAmountWithDiscount = ref(100)
const onDiscountDialogOpen = (isOpen) => {
  if (isOpen) {
    totalAmountWithDiscount.value = store.getTotalDiscountAmount
  }
}

const onDiscountValueChange = (event) => {
  const discountAmount = Number(event.target.value)
  store.setDiscountByAmount(discountAmount)
}
</script>
