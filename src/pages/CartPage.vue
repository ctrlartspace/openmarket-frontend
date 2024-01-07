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

        <div class="mt-4 mb-4 h-full overflow-auto">
          <p
            v-if="store.cartItems.length === 0"
            class="text-center text-gray-300"
          >
            В корзине нет товаров
          </p>
          <table v-else class="table-auto w-full text-lg text-left bg-white">
            <tbody>
              <tr
                v-for="(item, i) in store.cartItems"
                class="cursor-pointer hover:bg-gray-100 border border-gray-200 rounded flex items-center justify-between gap-2 p-2 mt-2 first:mt-0"
                :key="i"
                @click="onItemClick(item.id)"
              >
                <td class="flex items-center">
                  <span
                    class="material-icons rounded hover:bg-red-100 hover:text-red-700 select-none"
                    @click.stop="store.removeItem(i)"
                  >
                    remove
                  </span>
                </td>
                <td class="flex-1 font-semibold">
                  {{ `${item.name} ${item.name}` }}
                </td>
                <td class="text-gray-300">1 шт.</td>
                <td>{{ item.purchase_price }} KZT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-auto">
          <div
            v-for="i in 2"
            class="inline-block bg-white text-lg text-gray-300 px-4 py-2 cursor-pointer border-t border-b border-r border-gray-200 hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
            :key="i"
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
        <cart-total class="mt-auto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchField from "@/components/SearchField.vue"
import CartChange from "@/components/CartChange.vue"
import CartTotal from "@/components/CartTotal.vue"

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getItem } from "@/services/ItemSearch"

const store = useCartStore()
const router = useRouter()

const inputValue = ref(null)

const searchItems = ref([{ id: 1, name: "sdf" }])

const addCartItem = async (id) => {
  try {
    const item = await getItem(id)
    store.addItem(item)
  } catch (error) {
    console.error(error)
  }
}

const onItemClick = (id) => {
  router.push(`/items/${id}`)
}
</script>
