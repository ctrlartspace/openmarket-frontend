<template>
  <div>
    <barcode-scanner :is-stopped="isStopped" @success="onScanned" />

    <audio class="hidden" id="beepSound" controls preload="none">
      <source src="../assets/beep.wav" type="audio/wav" />
    </audio>
    <div v-if="isNotFound" class="p-4 text-red-600 text-center">
      <p>Товар не найден</p>
    </div>
    <div class="p-4 text-center">
      <button
        class="px-4 mt-2 border border-gray-600 rounded"
        @click="isNumberInput = true"
      >
        Ввод цифр
      </button>
    </div>
    <div class="absolute bottom-12 left-0 right-0 p-4 mb-safe">
      <div
        v-if="isNumberInput"
        class="relative p-4 flex flex-col gap-2 rounded-xl bg-white shadow-lg border border-gray-200"
      >
        <div class="p-4 text-2xl text-center border rounded-xl">
          <p
            class="tracking-widest"
            :class="isLoading ? 'text-gray-300 animate-pulse' : ''"
          >
            {{ inputNumber }}
          </p>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="i in 10"
            class="px-2 py-2 border border-gray-200 rounded-xl text-xl text-center"
            :class="i - 1 === 0 ? 'order-last col-span-2 ' : ''"
            @click="setNumberInput(i - 1)"
            :disabled="isLoading"
          >
            {{ i - 1 }}
          </button>
          <button
            class="flex items-center justify-center px-2 py-2 bg-black text-white rounded-xl text-xl text-center order-last"
            @click="isNumberInput = false"
          >
            <span class="material-icons-outlined">close</span>
          </button>
        </div>
      </div>
      <div
        v-if="resultItem"
        class="relative p-4 rounded-xl bg-white shadow-lg border border-gray-200"
      >
        <p class="text-sm">{{ resultItem.code }}</p>
        <p class="text-2xl">{{ resultItem.name }}</p>
        <p class="text-2xl">{{ resultItem.purchasePrice }} KZT</p>
        <div class="mt-2 flex gap-2 justify-between items-center">
          <button
            class="w-full p-2 bg-gray-100 flex items-center justify-center rounded-xl"
            @click="minusItem"
          >
            <span class="material-icons-outlined">remove</span>
          </button>
          <div class="w-full text-center">
            <span class="text-2xl">{{ itemCount }}</span>
          </div>
          <button
            class="w-full p-2 bg-gray-100 flex items-center justify-center rounded-xl"
            @click="plusItem"
          >
            <span class="material-icons-outlined">add</span>
          </button>
        </div>
        <button
          class="mt-4 w-full px-4 py-2 rounded-xl text-center text-white bg-black flex items-center justify-center gap-2 hover:brightness-95"
          @click="addToCart"
        >
          Добавить
        </button>
        <button class="absolute top-0 right-0 p-4" @click="resetScanner">
          <span class="material-icons-outlined">close</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarcodeScanner from "@/components/BarcodeScanner.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getItem } from "@/services/ItemSearch"
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
const router = useRouter()
const isStopped = ref(false)
const isNotFound = ref(false)
const resultItem = ref(null)
const itemCount = ref(1)
const isNumberInput = ref(false)
const inputNumber = ref("000000")
const isLoading = ref(false)

const setNumberInput = async (value) => {
  if (inputNumber.value === "000000") {
    inputNumber.value = ""
  }

  inputNumber.value += value
  if (inputNumber.value.length >= 5) {
    await checkItem(inputNumber.value)
  }
}

const resetScanner = () => {
  resultItem.value = null
  isStopped.value = false
  isNotFound.value = false
}

const backToCart = () => {
  router.push("/cart")
}

const minusItem = () => {
  if (itemCount.value > 1) {
    itemCount.value -= 1
  }
}
const plusItem = () => {
  itemCount.value += 1
}

const addToCart = () => {
  store.addItem(resultItem.value, itemCount.value)
  resultItem.value = null
  isStopped.value = false
  itemCount.value = 1
}

const checkItem = async (id) => {
  try {
    isLoading.value = true
    isNotFound.value = false
    const item = await getItem(id)
    resultItem.value = item
    isStopped.value = true
    const sound = document.getElementById("beepSound")
    sound.play()
    isNumberInput.value = false
  } catch (error) {
    console.error(error)
    isNotFound.value = true
  } finally {
    inputNumber.value = "000000"
    isLoading.value = false
  }
}

const onScanned = async (resultCode) => {
  await checkItem(resultCode)
}
</script>
