<template>
  <div class="content">
    <v-row>
      <v-col cols="8">
        <search-field
          class="mb-4"
          v-model="inputValue"
          :search-items="['esfs', 'sdfdsf']"
          @submit="addCartItem"
          @change="console.log($event)"
        />
        <cart-item
          v-for="(item, i) in store.cartItems"
          :item="item"
          @click=""
          @on-remove-click="store.removeItem(i)"
          :key="i"
        />
      </v-col>
      <v-col>
        <cart-change />
        <cart-total-value @click="" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import SearchField from "@/components/SearchField.vue"
import CartItem from "@/components/CartItem.vue"
import CartChange from "@/components/CartChange.vue"
import CartTotalValue from "@/components/CartTotalValue.vue"

import { ref } from "vue"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()

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
