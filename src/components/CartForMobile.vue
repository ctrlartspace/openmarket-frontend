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
          class="flex-1 w-full h-full text-lg placeholder:text-gray-300 focus:outline-none text-ellipsis"
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
            class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2 last:border-none whitespace-nowrap"
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
            <td class="font-semibold flex-1 text-ellipsis">
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
  <div
    v-if="!store.isEmpty"
    class="absolute bottom-12 left-0 right-0 p-4 mb-safe"
  >
    <button
      v-if="cartStep === 1"
      class="w-full bg-black text-white flex justify-center gap-4 font-semibold text-2xl p-4 rounded-xl hover:brightness-50 cursor-pointer select-none shadow-xl"
      @click.once="stepForward"
    >
      <span>{{ store.getTotalAmount }} KZT</span>
      <span class="material-icons self-center font-semibold"
        >arrow_forward</span
      >
    </button>
    <div
      v-if="cartStep === 2"
      class="relative p-4 rounded-xl bg-white shadow-lg border border-gray-200"
    >
      <div class="absolute">
        <button class="flex items-center" @click="stepBack">
          <span class="material-icons-outlined text-xl text-gray-300"
            >arrow_back_ios</span
          >
        </button>
      </div>
      <p class="text-lg text-center text-gray-300 mb-2">Тип оплаты</p>
      <div v-if="store.getPaymentType.code === 'card'">
        <button
          class="w-full text-lg px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-xl"
          @click="store.changePaymentType"
        >
          Карта
        </button>
      </div>
      <div
        v-if="store.getPaymentType.code === 'cash'"
        class="flex flex-col gap-2"
      >
        <button
          class="w-full text-lg px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-xl"
          @click="store.changePaymentType"
        >
          Наличные
        </button>
        <div
          class="px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl flex justify-between items-center"
        >
          <span class="text-lg text-gray-300">Сдача</span>
          <span class="text-lg text-gray-300">{{ cartChange }} KZT</span>
        </div>
        <input
          v-model="inputAmount"
          class="w-full text-center text-lg border border-gray-200 px-4 py-2 placeholder:font-normal placeholder:text-gray-300 appearance-none font-semibold rounded-xl focus:outline-2 focus:outline-black focus:bg-white"
          placeholder="Внесено"
          type="number"
        />
      </div>
    </div>
    <button
      v-if="cartStep === 2"
      class="w-full mt-2 bg-black text-white flex justify-center items-center gap-4 font-semibold text-2xl p-4 rounded-xl hover:brightness-50 cursor-pointer select-none shadow-xl"
      @click.once="makeSaleFromCart"
    >
      <span>Готово</span>
      <!-- <span class="material-icons-outlined self-center font-semibold"
        >done</span
      > -->
    </button>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getItem } from "@/services/ItemSearch"
import { makeSale } from "@/services/ItemSearch"

const store = useCartStore()
const router = useRouter()

const searchInput = ref(null)
const inputValue = ref("")
const isSearchError = ref(false)

const cartStep = ref(1)
const inputAmount = ref("")

const cartChange = computed(() =>
  inputAmount.value ? inputAmount.value - store.getTotalAmount : 0
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
    const item = await getItem(inputValue.value)
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
