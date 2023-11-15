<template>
  <v-select v-model="paymentType" :items="paymentTypes"></v-select>
  <div v-if="paymentType === 'cash'">
    <v-text-field
      v-model="inputAmount"
      class="mb-2"
      hide-details
      placeholder="Сумма"
    >
    </v-text-field>
    <v-text-field class="mb-2" hide-details readonly :value="cartChange">
    </v-text-field>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { paymentTypes } from "@/utils/base-data"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
const inputAmount = ref(null)
const paymentType = ref(paymentTypes[1])

const cartChange = computed(() => inputAmount.value - store.getTotalAmount)
</script>
