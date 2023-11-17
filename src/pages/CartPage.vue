<template>
  <div class="grid grid-cols-6 gap-4 mt-32">
    <div class="col-span-4">
      <div class="bg-red-100">
        <search-field
          class="mb-4"
          v-model="inputValue"
          :search-items="searchItems"
          @submit="addCartItem"
          @change="search"
          @on-search-item-click="addCartItem"
          autoclear
        />
      </div>
      <div class="h-96 overflow-hidden">
        <cart-item
          v-for="(item, i) in store.cartItems"
          :item="item"
          @click=""
          @on-remove-click="store.removeItem(i)"
          :key="i"
        />

        <div
          v-if="store.cartItems.length === 0"
          class="flex align-middle justify-center h-full"
        >
          <span class="material-icons self-center text-8xl text-gray-100"
            >add_shopping_cart</span
          >
        </div>
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
          class="inline-block text-lg text-gray-300 px-4 py-2 cursor-pointer border-b border-r hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl last:rounded-br first:text-black"
        >
          <div class="flex">
            <span class="self-center material-icons text-lg"> add</span>
          </div>
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
