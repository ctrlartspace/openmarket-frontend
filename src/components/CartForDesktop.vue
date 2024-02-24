<template>
  <div class="grid grid-cols-6 gap-2 h-96 p-2">
    <div class="col-span-6 md:col-span-4">
      <div class="bg-white border border-gray-200 rounded h-96">
        <div class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="relative flex-1 flex justify-between gap-2 items-center">
            <span class="material-icons text-gray-300 md:text-[28px]"
              >search</span
            >
            <v-form @submit.prevent="addCartItem" class="relative w-full">
              <input
                ref="searchInput"
                v-model.trim="inputValue"
                type="text"
                class="flex-1 w-full h-full placeholder:text-gray-300 focus:outline-none"
                :class="
                  isSearchError ? 'text-red-600 animate-shake' : 'text-black'
                "
                @input="isSearchError = false"
                placeholder="Код товара, наименование"
              />
              <div
                v-if="false"
                class="absolute w-full mt-2 bg-white border border-t-0 border-gray-200 rounded-b before:w-full before:h-0.5 before:bg-blue-600 before:absolute shadow-xl overflow-hidden"
              >
                <ul>
                  <li
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    v-for="(item, index) in store.groupedCartItems"
                    :key="index"
                    :value="index"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </v-form>
          </div>
        </div>
        <table class="table-auto w-full text-left bg-white">
          <tbody>
            <tr
              v-if="store.groupedCartItems.length === 0"
              class="border-b flex justify-center px-4 py-2 last:border-none"
            >
              <span class="text-gray-300">Нет данных</span>
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
              <td class="font-medium flex-1">
                {{ item.name }}
              </td>
              <td>{{ item.count }} шт.</td>
              <td class="text-green-600 font-medium">
                {{ item.count * item.purchasePrice }} KZT
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-span-2">
      <div
        class="h-full flex flex-col justify-between bg-white border border-gray-200 p-4 rounded"
      >
        <cart-change />
        <!-- <cart-total /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import CartChange from "@/components/CartChange.vue"
import CartTotal from "@/components/CartTotal.vue"
import CartTotalBar from "@/components/CartTotalBar.vue"

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
