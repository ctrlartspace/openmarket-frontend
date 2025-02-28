<template>
  <a-modal title="Скидка на покупку" @handle="resetDiscountOnOpen">
    <template #default="{ props }">
      <slot :props="props"></slot>
    </template>
    <template #content="{ closeModal }">
      <form
        class="flex flex-col gap-4"
        @submit.prevent="handleSubmit(closeModal)"
      >
        <!-- Секция выбора процента скидки -->
        <div
          class="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto whitespace-nowrap pr-8 [mask-image:linear-gradient(to_right,black_80%,transparent_100%)]"
        >
          <button
            v-for="(_, index) in 21"
            :key="index"
            v-press
            :class="[
              'flex snap-start items-center justify-center rounded-xl border-2 px-4 py-2 font-medium',
              'border-rose-50 bg-rose-50 text-rose-500 dark:border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-200',
              'hover:border-rose-100 hover:bg-rose-100 dark:hover:border-rose-600 dark:hover:bg-rose-600/20',
              {
                '!border-rose-500 dark:!border-rose-600':
                  index * 5 === store.discount,
              },
            ]"
            type="button"
            @click="applyPercentageDiscount(index * 5, closeModal)"
          >
            {{ index * 5 }}%
          </button>
        </div>

        <!-- Поля ввода -->
        <FloatLabel class="w-full" variant="in">
          <InputNumber
            :defaultValue="store.getTotalAmount"
            fluid
            locale="ru-RU"
            readonly
            suffix=" ₸"
          />
          <label class="text-gray-300">Цена без скидки</label>
        </FloatLabel>

        <FloatLabel class="w-full" variant="in">
          <InputNumber
            v-model="customDiscountAmount"
            :class="{ 'p-invalid': !isDiscountValid }"
            :invalid="!isDiscountValid"
            :max="store.getTotalAmount"
            :min="0"
            fluid
            locale="ru-RU"
            suffix=" ₸"
            @input="applyCustomDiscount"
          />
          <label class="text-gray-300">Цена со скидкой</label>
        </FloatLabel>

        <!-- Кнопка submit -->
        <button
          v-press
          :disabled="!isDiscountValid"
          class="mt-2 flex w-full items-center justify-center rounded-xl bg-rose-50 px-4 py-3 font-medium text-rose-500 hover:bg-rose-100 disabled:opacity-50 dark:bg-rose-500/20 dark:text-rose-200 dark:hover:bg-rose-600/20"
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
import { computed, ref } from "vue" // Store и состояние

// Store и состояние
const store = useCartStore()
const customDiscountAmount = ref(store.getTotalDiscountAmount || 0)

// Вычисляемые свойства

const isDiscountValid = computed(() => {
  const amount = Number(customDiscountAmount.value)
  return (
    !isNaN(amount) && // Должно быть числом
    amount >= 0 && // Не отрицательное
    amount <= store.getTotalAmount // Не больше общей суммы
  )
})

// Методы
const resetDiscountOnOpen = (isOpen) => {
  if (isOpen) {
    customDiscountAmount.value = store.getTotalDiscountAmount || 0
  }
}

const applyPercentageDiscount = (percentage, closeModal) => {
  store.setDiscount(percentage)
  store.applyDiscount()
  closeModal()
}

const applyCustomDiscount = (event) => {
  const amount = Number(event.value)
  if (isDiscountValid.value) {
    store.setDiscountByAmount(amount)
  }
}

const handleSubmit = (closeModal) => {
  if (isDiscountValid.value) {
    store.applyDiscount()
    closeModal()
  }
}
</script>
