<template>
  <div>
    <div class="relative">
      <input
        v-model="inputAmount"
        class="mb-0 border border-gray-300 px-4 py-2 text-lg placeholder:font-normal placeholder:text-gray-300 appearance-none font-semibold rounded w-full focus:outline-2 focus:outline-black focus:bg-white"
        placeholder="Наличные"
        type="text"
      />
      <div
        v-if="inputAmount"
        class="absolute inset-y-0 right-2 flex items-center"
      >
        <span
          class="material-icons text-gray-400 hover:text-gray-800 cursor-pointer"
          @click="inputAmount = ''"
          >close</span
        >
      </div>
    </div>
    <div
      v-if="inputAmount"
      class="mt-4 px-4 py-2 border border-gray-300 rounded"
    >
      <span class="text-lg font-semibold text-blue-400">{{ cartChange }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
const inputAmount = ref(null)

const cartChange = computed(() => inputAmount.value - store.getTotalAmount)
</script>
