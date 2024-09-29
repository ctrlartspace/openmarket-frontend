<template>
  <a-page>
    <div class="grid h-full grid-cols-8 gap-2 bg-neutral-100">
      <div class="col-span-5 flex flex-col gap-2">
        <div class="relative">
          <v-form class="relative w-full" @submit.prevent="addCartItem">
            <input
              ref="searchInput"
              v-model.trim="inputValue"
              type="text"
              class="block w-full text-ellipsis rounded border border-neutral-300 px-4 py-2 pl-12 outline-black placeholder:text-gray-300"
              :class="
                isSearchError ? 'animate-shake text-red-600' : 'text-black'
              "
              placeholder="Код товара, наименование"
              @input="isSearchError = false"
            />
            <div
              class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center px-4"
            >
              <span class="material-symbols-outlined text-gray-300"
                >search</span
              >
            </div>
          </v-form>
        </div>
        <div
          v-if="store.groupedCartItems.length === 0"
          class="flex justify-center border-b px-4 py-2 last:border-none"
        >
          <span class="text-gray-300">Нет данных</span>
        </div>
        <div
          v-else
          class="overflow-hidden rounded border border-neutral-300 bg-white"
        >
          <table class="w-full table-auto bg-white text-left">
            <tbody>
              <tr
                v-for="(item, i) in store.groupedCartItems"
                :key="i"
                class="flex cursor-pointer items-center justify-between gap-2 border-b px-4 py-2 last:border-none hover:bg-gray-50 active:bg-gray-50"
                @click="onItemClick(item)"
              >
                <td class="flex items-center">
                  <span
                    class="material-symbols-outlined select-none rounded hover:bg-red-100 hover:text-red-700 active:bg-red-100 active:text-red-700 md:text-[28px]"
                    @click.stop="store.removeItem(item.id)"
                  >
                    remove
                  </span>
                </td>
                <td class="flex-1 font-medium">
                  {{ item.name }}
                </td>
                <td>{{ item.count }} шт.</td>
                <td class="font-medium text-green-600">
                  {{ item.count * item.sellingPrice }} ₸
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-span-3">
        <div class="flex flex-col gap-2">
          <div
            class="flex flex-col justify-between rounded border border-neutral-300 bg-white p-4"
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
  router.push(`/point/items/${item.id}`)
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
