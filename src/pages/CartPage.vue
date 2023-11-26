<template>
  <div class="grid grid-cols-6 gap-4 h-96">
    <div class="col-span-4 bg-white border border-gray-200 p-4 rounded h-96">
      <div class="flex flex-col h-full">
        <search-field
          v-model="inputValue"
          :search-items="searchItems"
          @submit="addCartItem"
          @on-search-item-click="addCartItem"
          autoclear
        />

        <div class="mt-4 mb-4 bg-white border rounded overflow-auto h-full">
          <table class="table-auto w-full text-lg text-left bg-white">
            <tbody>
              <tr
                v-for="(item, i) in store.cartItems"
                class="cursor-pointer hover:bg-gray-100 border-b"
                :key="i"
              >
                <td class="py-2 flex justify-center">
                  <span
                    class="material-icons rounded hover:bg-red-100 hover:text-red-700 select-none"
                    @click="onRemoveClick"
                  >
                    remove
                  </span>
                </td>
                <td class="py-2 font-semibold">
                  {{ `${item.item_brand.name} ${item.item_name}` }}
                </td>
                <td class="px-4 py-2">{{ item.item_category }}</td>
                <td class="px-4 py-2">{{ item.item_subcategory }}</td>
                <td class="px-4 py-2">{{ item.item_purchase_price }}</td>
              </tr>
            </tbody>
          </table>
          <!-- <base-data-item v-for="(item, i) in items" :item="item" :key="i" /> -->
        </div>

        <!-- <div
          class="mb-2 mt-2 transition-colors overflow-auto"
          :class="{ 'bg-gray-50': store.isEmpty }"
        >
          <cart-item
            v-for="(item, i) in store.cartItems"
            :item="item"
            @click=""
            @on-remove-click="store.removeItem(i)"
            :key="i"
          />
        </div> -->

        <div class="mt-auto">
          <div
            v-for="i in 2"
            class="inline-block bg-white text-lg text-gray-300 px-4 py-2 cursor-pointer border-t border-b border-r border-gray-200 hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
          >
            <div class="flex">
              <span class="self-center material-icons text-lg">
                shopping_cart</span
              >
              <span class="ml-2"> {{ i }} </span>
            </div>
          </div>
          <div
            class="inline-block bg-white text-lg text-gray-300 px-4 py-2 cursor-pointer border-t border-b border-r border-gray-200 hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
          >
            <div class="flex">
              <span class="self-center material-icons text-lg"> add</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-span-2 bg-white border border-gray-200 p-4 rounded sticky top-16"
    >
      <div class="flex flex-col h-full">
        <cart-change class="" />
        <cart-total class="mt-auto" @click="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchField from "@/components/SearchField.vue"
import CartItem from "@/components/CartItem.vue"
import CartChange from "@/components/CartChange.vue"
import CartTotal from "@/components/CartTotal.vue"

import { ref } from "vue"
import { useCartStore } from "@/stores/cart.store"
import { getItem } from "@/services/ItemSearch"

const store = useCartStore()

const inputValue = ref(null)

const searchItems = ref(null)

const addCartItem = async (code) => {
  try {
    const item = await getItem(code)
    store.addItem(item)
  } catch (error) {
    console.error(error)
  }
}
</script>
