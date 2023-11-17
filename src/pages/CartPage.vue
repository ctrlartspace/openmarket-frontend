<template>
  <div class="grid grid-cols-6 gap-4 mt-16">
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
      <div
        class="mb-4 h-96 overflow-hidden transition-colors"
        :class="{ 'bg-gray-50': store.isEmpty }"
      >
        <cart-item
          v-for="(item, i) in store.cartItems"
          :item="item"
          @click=""
          @on-remove-click="store.removeItem(i)"
          :key="i"
        />
      </div>
      <div class="sticky bottom-6 bg-white">
        <div
          v-for="i in 2"
          class="inline-block text-lg text-gray-300 px-4 py-2 cursor-pointer border-t border-b border-r hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
        >
          <div class="flex">
            <span class="self-center material-icons text-lg">
              shopping_cart</span
            >
            <span class="ml-2"> {{ i }} </span>
          </div>
        </div>
        <div
          class="inline-block text-lg text-gray-300 px-4 py-2 cursor-pointer border-t border-b border-r hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
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
