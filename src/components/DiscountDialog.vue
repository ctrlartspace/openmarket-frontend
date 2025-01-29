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
            class="flex items-center justify-center rounded-xl border-2 border-rose-50 bg-rose-50 px-4 py-2 font-medium text-rose-500 hover:brightness-95"
            type="button"
            @click="
              store.setDiscount(i * 5), store.applyDiscount(), closeModal()
            "
          >
            {{ i * 5 }}%
          </button>
        </div>

        <!--        <label class="text-gray-300">Цена со скидкой</label>-->
        <FloatLabel variant="in">
          <InputNumber
            v-model="totalAmountWithDiscount"
            fluid
            locale="ru-RU"
            suffix=" ₸"
            @input="onDiscountValueChange"
          />
          <label class="text-gray-300">Цена со скидкой</label>
        </FloatLabel>

        <button
          v-press
          class="pointer-events-auto mt-2 flex items-center justify-center rounded-xl bg-rose-50 px-4 py-3 font-medium text-rose-500 hover:brightness-95"
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
const totalAmountWithDiscount = ref(0)
const onDiscountDialogOpen = (isOpen) => {
  if (isOpen) {
    totalAmountWithDiscount.value = store.getTotalDiscountAmount || null
  }
}

const onDiscountValueChange = (event) => {
  const discountAmount = Number(event.value)
  store.setDiscountByAmount(discountAmount)
}
</script>
