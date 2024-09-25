<template>
  <a-page>
    <div class="flex flex-col gap-2">
      <v-form class="relative w-full" @submit.prevent="addCartItem">
        <input
          ref="searchInput"
          v-model.trim="inputValue"
          type="text"
          class="block w-full text-ellipsis rounded-xl border border-neutral-300 px-4 py-2 pl-12 text-lg outline-black placeholder:text-gray-300 md:rounded"
          :class="isSearchError ? 'animate-shake text-red-600' : 'text-black'"
          placeholder="Код товара, наименование"
          @input="isSearchError = false"
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center px-4"
        >
          <span class="material-icons text-gray-300">search</span>
        </div>
      </v-form>
      <div
        class="overflow-hidden rounded-xl border border-neutral-300 bg-white md:rounded"
      >
        <table class="w-full table-auto text-left text-lg">
          <tbody>
            <tr
              v-for="(item, i) in store.groupedCartItems"
              :key="i"
              class="flex cursor-pointer items-center gap-2 border-b border-neutral-300 px-4 py-2 last:border-none hover:bg-gray-50 active:bg-gray-50"
              @click="onItemClick(item)"
            >
              <td class="flex items-center">
                <button class="flex items-center justify-center">
                  <span
                    class="material-icons select-none rounded bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 active:bg-red-200 active:text-red-700"
                    @click.stop="store.removeItem(item.id)"
                  >
                    remove
                  </span>
                </button>
              </td>
              <td class="line-clamp-1 font-medium">
                <span class=""> {{ item.name }}</span>
              </td>
              <div class="ml-auto flex gap-2 whitespace-nowrap">
                <td class="">{{ item.count }} шт.</td>
                <td class="font-medium text-green-600">
                  {{ item.count * item.sellingPrice }} KZT
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <table class="w-full table-auto text-left text-lg">
          <tbody>
            <tr
              v-for="(item, i) in store.groupedCartItems"
              :key="i"
              class="flex cursor-pointer items-center gap-2 border-b border-neutral-300 px-4 py-2 last:border-none hover:bg-gray-50 active:bg-gray-50"
              @click="onItemClick(item)"
            >
              <td class="flex items-center">
                <button class="flex items-center justify-center">
                  <span
                    class="material-icons select-none rounded bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 active:bg-red-200 active:text-red-700"
                    @click.stop="store.removeItem(item.id)"
                  >
                    remove
                  </span>
                </button>
              </td>
              <td class="line-clamp-1 font-medium">
                <span class=""> {{ item.name }}</span>
              </td>
              <div class="ml-auto flex gap-2 whitespace-nowrap">
                <td class="">{{ item.count }} шт.</td>
                <td class="font-medium text-green-600">
                  {{ item.count * item.sellingPrice }} KZT
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <cart-total-for-mobile v-if="!isDesktop" />
  </a-page>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getPointItem } from "@/services/PointService"
import CartTotalForMobile from "@/components/CartTotalForMobile.vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

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
