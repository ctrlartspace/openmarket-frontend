<template>
  <div class="relative p-4 flex flex-col gap-2">
    <div
      class="relative bg-white px-4 py-2 flex justify-between gap-2 items-center border md:rounded rounded-xl"
    >
      <span class="material-icons text-gray-300">search</span>
      <v-form @submit.prevent="addCartItem" class="relative w-full">
        <input
          ref="searchInput"
          v-model.trim="inputValue"
          type="text"
          class="flex-1 w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
          :class="isSearchError ? 'text-red-600 animate-shake' : 'text-black'"
          @input="isSearchError = false"
          placeholder="Код товара, наименование"
        />
        <div
          v-if="false"
          class="absolute w-full mt-2 bg-white border border-t-0 border-gray-200 rounded-b before:w-full before:h-0.5 before:bg-blue-600 before:absolute shadow-xl overflow-hidden"
        >
          <ul>
            <li class="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer">
              sdf
            </li>
            <li
              class="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer"
              v-for="(item, index) in store.groupedCartItems"
              :key="index"
              :value="index"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </v-form>
      <button class="flex items-center" @click="router.push('/scan')">
        <span class="material-icons text-gray-300">photo_camera</span>
      </button>
    </div>
    <p
      v-if="store.groupedCartItems.length === 0"
      class="text-gray-300 text-lg text-center"
    >
      Пусто
    </p>
    <div v-else class="border md:rounded rounded-xl overflow-hidden bg-white">
      <table class="table-auto w-full text-lg text-left">
        <tbody>
          <tr
            v-for="(item, i) in store.groupedCartItems"
            class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2 last:border-none"
            @click="onItemClick(item.id)"
            :key="i"
          >
            <td class="flex items-center">
              <button class="flex items-center justify-center">
                <span
                  class="material-icons text-red-600 bg-red-100 rounded hover:bg-red-200 hover:text-red-700 select-none"
                  @click.stop="store.removeItem(item.id)"
                >
                  remove
                </span>
              </button>
            </td>
            <td class="font-semibold flex-1">
              {{ item.name }}
            </td>
            <td>{{ item.count }} шт.</td>
            <td class="text-green-600 font-semibold">
              {{ item.count * item.purchasePrice }} KZT
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="absolute bottom-8 left-0 right-0 p-4 mb-safe">
    <cart-total />
  </div>
</template>

<script setup>
import CartTotalBar from "@/components/CartTotalBar.vue"
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
