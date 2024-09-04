<template>
  <a-page>
    <div class="h-full grid grid-cols-8 gap-2">
      <div class="col-span-5 flex flex-col gap-2">
        <div class="bg-white border border-neutral-300 rounded px-4 py-2">
          <div class="relative flex-1 flex justify-between gap-2 items-center">
            <span class="material-icons text-gray-300 md:text-[28px]"
              >search</span
            >
            <v-form class="relative w-full" @submit.prevent="addCartItem">
              <input
                ref="searchInput"
                v-model.trim="inputValue"
                :class="
                  isSearchError ? 'text-red-600 animate-shake' : 'text-black'
                "
                class="flex-1 w-full h-full placeholder:text-gray-300 focus:outline-none"
                placeholder="Код товара, наименование"
                type="text"
                @input="isSearchError = false"
              />
              <div
                v-if="false"
                class="absolute w-full mt-2 bg-white border border-t-0 border-neutral-300 rounded-b before:w-full before:h-0.5 before:bg-blue-600 before:absolute shadow-xl overflow-hidden"
              >
                <ul>
                  <li
                    v-for="(item, index) in store.groupedCartItems"
                    :key="index"
                    :value="index"
                    class="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 cursor-pointer"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </v-form>
          </div>
        </div>
        <div
          v-if="store.groupedCartItems.length === 0"
          class="border-b flex justify-center px-4 py-2 last:border-none"
        >
          <span class="text-gray-300">Нет данных</span>
        </div>
        <div
          v-else
          class="bg-white border border-neutral-300 rounded overflow-hidden"
        >
          <table class="table-auto w-full text-left bg-white">
            <tbody>
              <tr
                v-for="(item, i) in store.groupedCartItems"
                :key="i"
                class="cursor-pointer hover:bg-gray-50 active:bg-gray-50 border-b last:border-none flex items-center justify-between gap-2 px-4 py-2"
                @click="onItemClick(item)"
              >
                <td class="flex items-center">
                  <span
                    class="material-icons rounded hover:bg-red-100 active:bg-red-100 hover:text-red-700 active:text-red-700 select-none md:text-[28px]"
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
                  {{ item.count * item.sellingPrice }} KZT
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-span-3">
        <div class="flex flex-col gap-2">
          <div
            class="flex flex-col justify-between bg-white border border-neutral-300 p-4 rounded"
          >
            <cart-change />
          </div>
        </div>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import CartChange from "@/components/CartChange.vue"

import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getPointItem } from "@/services/PointService"
import APage from "@/pages/APage.vue"

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
    const item = await getPointItem(inputValue.value, { searchBy: "code" })
    store.addItem(item)
    inputValue.value = ""
    isSearchError.value = false
  } catch (error) {
    isSearchError.value = true
    console.error(error)
  }
}

const onItemClick = (item) => {
  router.push(`/items/${item.id}`)
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
