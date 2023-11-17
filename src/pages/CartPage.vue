<template>
  <div class="grid grid-cols-6 gap-4 h-full max-h-96 mt-32 overflow-hidden">
    <div class="col-span-4">
      <search-field
        class="mb-4"
        v-model="inputValue"
        :search-items="searchItems"
        @submit="addCartItem"
        @change="search"
        @on-search-item-click="addCartItem"
        autoclear
      />
      <cart-item
        v-for="(item, i) in store.cartItems"
        :item="item"
        @click=""
        @on-remove-click="store.removeItem(i)"
        :key="i"
      />
    </div>
    <div class="col-span-2">
      <cart-change />
      <cart-total-value @click="" />
    </div>
  </div>
</template>

<script setup>
import SearchField from "@/components/SearchField.vue"
import CartItem from "@/components/CartItem.vue"
import CartChange from "@/components/CartChange.vue"
import CartTotalValue from "@/components/CartTotalValue.vue"

import { ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { getItems } from "@/services/ItemSearch"

const store = useCartStore()

const inputValue = ref(null)

const searchItems = ref(null)

const search = () => {
  searchItems.value = getItems(inputValue.value)
}

const addCartItem = (id) => {
  console.log(id)
  store.addItem(id)
}
</script>
