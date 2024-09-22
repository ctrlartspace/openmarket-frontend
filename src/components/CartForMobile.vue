<template>
  <div class="flex h-full flex-col">
    <header>
      <nav>
        <div
          class="flex items-center border-b border-gray-200 bg-white px-4 py-2"
        >
          <div class="absolute left-0 right-0">
            <div class="flex justify-between px-4">
              <button class="flex items-center">
                <span class="material-icons-outlined">delete</span>
              </button>
              <button class="flex items-center">
                <span class="material-icons-outlined">add</span>
              </button>
            </div>
          </div>
          <h2 class="w-full text-center text-lg font-medium">Корзина</h2>
        </div>
      </nav>
    </header>
    <div class="flex-1">
      <div class="relative flex flex-col gap-2 p-4">
        <div
          class="relative flex items-center justify-between gap-2 rounded-xl border bg-white px-4 py-2 md:rounded"
        >
          <span class="material-icons text-gray-300">search</span>
          <v-form class="relative w-full" @submit.prevent="addCartItem">
            <input
              ref="searchInput"
              v-model.trim="inputValue"
              :class="
                isSearchError ? 'animate-shake text-red-600' : 'text-black'
              "
              class="h-full w-full flex-1 text-ellipsis text-lg placeholder:text-gray-300 focus:outline-none"
              placeholder="Код товара, наименование"
              type="text"
              @input="isSearchError = false"
            />
            <div
              v-if="false"
              class="absolute mt-2 w-full overflow-hidden rounded-b border border-t-0 border-gray-200 bg-white shadow-xl before:absolute before:h-0.5 before:w-full before:bg-blue-600"
            >
              <ul>
                <li
                  v-for="(item, index) in store.groupedCartItems"
                  :key="index"
                  :value="index"
                  class="cursor-pointer px-4 py-2 text-lg hover:bg-gray-100 active:bg-gray-100"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </v-form>
        </div>
        <p
          v-if="store.groupedCartItems.length === 0"
          class="text-center text-lg text-gray-300"
        >
          Пусто
        </p>
        <div
          v-else
          class="overflow-hidden rounded-xl border bg-white md:rounded"
        >
          <table class="w-full table-auto text-left text-lg">
            <tbody>
              <tr
                v-for="(item, i) in store.groupedCartItems"
                :key="i"
                class="flex cursor-pointer items-center gap-2 border-b px-4 py-2 last:border-none hover:bg-gray-50 active:bg-gray-50"
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
      <div
        v-if="!store.isEmpty"
        class="absolute bottom-12 left-0 right-0 p-4 mb-safe"
      >
        <button
          v-if="cartStep === 1"
          class="flex w-full cursor-pointer select-none justify-center gap-4 rounded-xl bg-black p-4 text-2xl font-medium text-white shadow-xl hover:brightness-50 active:brightness-50"
          @click.once="stepForward"
        >
          <span>{{ store.getTotalAmount }} KZT</span>
          <span class="material-icons self-center font-medium"
            >arrow_forward</span
          >
        </button>
        <div
          v-if="cartStep === 2"
          class="relative rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <div class="absolute">
            <button class="flex items-center" @click="stepBack">
              <span class="material-icons-outlined text-xl text-gray-300"
                >arrow_back_ios</span
              >
            </button>
          </div>
          <p class="mb-2 text-center text-lg text-gray-300">Тип оплаты</p>
          <div v-if="store.getPaymentType.code === 'card'">
            <button
              class="w-full rounded-xl bg-blue-100 px-4 py-2 text-lg font-medium text-blue-600"
              @click="store.changePaymentType"
            >
              Карта
            </button>
          </div>
          <div
            v-if="store.getPaymentType.code === 'cash-register'"
            class="flex flex-col gap-2"
          >
            <button
              class="w-full rounded-xl bg-blue-100 px-4 py-2 text-lg font-medium text-blue-600"
              @click="store.changePaymentType"
            >
              Наличные
            </button>
            <div
              class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-100 px-4 py-2"
            >
              <span class="text-lg text-gray-300">Сдача</span>
              <span class="text-lg text-gray-300">{{ cartChange }} KZT</span>
            </div>
            <input
              v-model="inputAmount"
              class="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2 text-center text-lg font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
              placeholder="Внесено"
              type="number"
            />
          </div>
        </div>
        <button
          v-if="cartStep === 2"
          class="mt-2 flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-xl bg-black p-4 text-2xl font-medium text-white shadow-xl hover:brightness-50 active:brightness-50"
          @click.once="makeSaleFromCart"
        >
          <span>Готово</span>
          <!-- <span class="material-icons-outlined self-center font-medium"
            >done</span
          > -->
        </button>
      </div>
    </div>
    <app-bottom-navigation-bar />
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getPointItem } from "@/services/PointService"
import { makeSale } from "@/services/ItemSearch"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"

const store = useCartStore()
const router = useRouter()

const searchInput = ref(null)
const inputValue = ref("")
const isSearchError = ref(false)

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0,
)

const stepBack = () => {
  cartStep.value -= 1
}
const stepForward = () => {
  cartStep.value += 1
}

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

const makeSaleFromCart = async () => {
  if (!store.isEmpty) {
    const response = await makeSale(store.getItemsForSale)
    store.clearCart()
    cartStep.value = 1
  }
}

const onItemClick = (item) => {
  router.push(`/point/items/${item.id}`)
}

// const setInputFocus = async () => {
//   if (searchInput.value) {
//     await nextTick()
//     searchInput.value.focus()
//   }
// }
// onMounted(async () => {
//   window.addEventListener("keypress", setInputFocus)
// })
// onBeforeUnmount(() => {
//   window.removeEventListener("keypress", setInputFocus)
// })
</script>
