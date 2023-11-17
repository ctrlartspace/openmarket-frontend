<template>
  <div class="grid grid-cols-6 gap-4 mt-32">
    <div class="col-span-4">
      <div class="h-96 overflow-hidden">
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
      <hr class="h-px bg-gray-200 border-0" />
      <div>
        <div
          v-for="i in 1"
          class="inline-block text-lg text-gray-300 px-4 py-2 cursor-pointer border-b border-r hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl last:rounded-br first:text-black"
        >
          <div class="flex">
            <span class="self-center material-icons text-lg">
              shopping_cart</span
            >
            <span class="ml-2"> {{ i }} </span>
          </div>
        </div>
        <div
          class="inline-block text-lg text-gray-300 px-4 py-2 cursor-pointer border-b border-r hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl last:rounded-br"
        >
          <span class="text-lg self-center">+</span>
        </div>
      </div>
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
