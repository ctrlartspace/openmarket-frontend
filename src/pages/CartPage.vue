<template>
  <div class="content">
    <v-row>
      <v-col cols="8">
        <v-form @submit.prevent="addCartItem">
          <v-text-field v-model="inputValue" placeholder="Код товара" />
        </v-form>
        <cart-item
          v-for="(item, i) in store.cartItems"
          :item="item"
          @click=""
          :key="i"
        />
      </v-col>
      <v-col>
        <v-select v-model="paymentType" :items="paymentTypes"></v-select>
        <div v-if="paymentType === 'cash'">
          <v-text-field placeholder="Сумма"> </v-text-field>
          <v-text-field placeholder="Сдача" readonly value="Сдача: 550">
          </v-text-field>
        </div>
        <cart-total-value @click=""></cart-total-value>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import CartItem from "@/components/CartItem.vue"
import CartTotalValue from "@/components/CartTotalValue.vue"

import { ref } from "vue"
import { paymentTypes } from "@/utils/base-data"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
console.log(store.cartItems)

const paymentType = ref(paymentTypes[1])
const inputValue = ref(null)

const addCartItem = () => {
  store.addItem(inputValue.value)
  inputValue.value = ""
}
</script>

<style scoped>
.content {
  margin-top: 90px;
}
</style>
