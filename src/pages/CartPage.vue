<template>
  <div class="grid grid-cols-6 gap-4 h-96">
    <div class="col-span-4">
      <div class="sticky top-4 bg-white border rounded overflow-auto h-96">
        <div
          v-if="selectedItems && selectedItems.length > 0"
          class="flex gap-2 justify-between px-4 py-2 border-b last:border-none"
        >
          <button
            class="flex gap-2 items-center hover:text-red-600 cursor-pointer"
            type="button"
          >
            <span class="material-icons">remove</span>
            <span class="text-lg">Удалить</span>
          </button>
        </div>
        <div v-else class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="flex-1 flex gap-2 items-center h-7">
            <span class="material-icons text-gray-300">search</span>
            <v-form @submit.prevent="addCartItem" class="w-full">
              <input
                ref="searchInput"
                v-model.trim="inputValue"
                type="text"
                class="w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
                :class="
                  isSearchError ? 'text-red-600 animate-shake' : 'text-black'
                "
                @input="isSearchError = false"
                placeholder="Код товара, наименование"
              />
            </v-form>
          </div>
        </div>
        <table class="table-auto w-full text-lg text-left bg-white">
          <tbody>
            <tr
              v-if="store.groupedCartItems.length === 0"
              class="border-b flex justify-center px-4 py-2 last:border-none"
            >
              <span class="text-gray-300 text-lg">Нет данных</span>
            </tr>
            <tr
              v-else
              v-for="(item, i) in store.groupedCartItems"
              class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2"
              @click="onItemClick(item.id)"
              :key="i"
            >
              <td class="flex items-center">
                <span
                  class="material-icons rounded hover:bg-red-100 hover:text-red-700 select-none"
                  @click.stop="store.removeItem(item.id)"
                >
                  remove
                </span>
              </td>
              <td class="font-semibold flex-1">
                {{ item.name }}
              </td>
              <td>{{ item.count }} шт.</td>
              <td class="text-green-600 font-semibold">
                {{ item.count * item.purchase_price }} KZT
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="col-span-2 bg-white border border-gray-200 p-4 rounded sticky top-16"
    >
      <div class="flex flex-col h-full">
        <div class="mt-auto">
          <div
            v-for="i in 1"
            class="inline-block bg-white text-lg text-gray-301 px-4 py-2 cursor-pointer border-t border-b border-r border-gray-200 hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
            :key="i"
          >
            <div class="flex">
              <span class="self-center material-icons text-lg">
                shopping_cart</span
              >
              <span class="ml-3"> {{ i }} </span>
            </div>
          </div>
          <div
            class="inline-block bg-white text-lg text-gray-301 px-4 py-2 cursor-pointer border-t border-b border-r border-gray-200 hover:bg-gray-100 first:rounded-br-none first:border-l first:rounded-bl first:rounded-tl last:rounded-tr last:rounded-br first:text-black"
          >
            <div class="flex">
              <span class="self-center material-icons text-lg"> add</span>
            </div>
          </div>
        </div>
        <cart-change class="" />
        <cart-total class="mt-auto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CartChange from "@/components/CartChange.vue"
import CartTotal from "@/components/CartTotal.vue"

import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getItem } from "@/services/ItemSearch"

const store = useCartStore()
const router = useRouter()

const searchInput = ref(null)
const inputValue = ref("")
const isSearchError = ref(false)

const addCartItem = async () => {
  isSearchError.value = false
  if (!inputValue.value) {
    return
  }

  try {
    const item = await getItem(inputValue.value)
    store.addItem(item)
    inputValue.value = ""
    isSearchError.value = false
  } catch (error) {
    isSearchError.value = true
    console.error(error)
  }
}

const onItemClick = (id) => {
  router.push(`/items/${id}`)
}

const setInputFocus = async () => {
  if (searchInput.value) {
    await nextTick()
    searchInput.value.focus()
  }
}
onMounted(async () => {
  window.addEventListener("keypress", setInputFocus)
})
onBeforeUnmount(() => {
  window.removeEventListener("keypress", setInputFocus)
})
</script>
