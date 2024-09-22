<template>
  <div class="flex h-full flex-col">
    <div class="flex-1">
      <barcode-scanner :is-stopped="isStopped" @success="onScanned" />

      <audio id="beepSound" class="hidden" controls preload="none">
        <source src="../assets/beep.wav" type="audio/wav" />
      </audio>
      <div v-if="isNotFound" class="p-4 text-center text-red-600">
        <p>Товар не найден</p>
      </div>
      <div class="p-4 text-center">
        <button
          class="mt-2 rounded border border-gray-600 px-4 py-2 active:bg-gray-50"
          @click="isNumberInput = true"
        >
          Ввод цифр
        </button>
      </div>
      <div class="absolute bottom-12 left-0 right-0 p-4 mb-safe">
        <div
          v-if="isNumberInput"
          class="relative flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <div class="rounded-xl border p-4 text-center text-2xl">
            <p
              :class="isLoading ? 'animate-pulse text-gray-300' : ''"
              class="tracking-widest"
            >
              {{ inputNumber }}
            </p>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="i in 10"
              :class="i - 1 === 0 ? 'order-last col-span-2' : ''"
              :disabled="isLoading"
              class="rounded-xl border border-gray-200 px-2 py-2 text-center text-xl active:bg-gray-50"
              @click="setNumberInput(i - 1)"
              :key="i"
            >
              {{ i - 1 }}
            </button>
            <button
              class="order-last flex items-center justify-center rounded-xl bg-black px-2 py-2 text-center text-xl text-white"
              @click="isNumberInput = false"
            >
              <span class="material-icons-outlined">close</span>
            </button>
          </div>
        </div>
        <div
          v-if="resultItem"
          class="relative rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <p class="text-sm">{{ resultItem.code }}</p>
          <p class="text-2xl">{{ resultItem.name }}</p>
          <p class="text-2xl">{{ resultItem.purchasePrice }} KZT</p>
          <div class="mt-2 flex items-center justify-between gap-2">
            <button
              class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-2"
              @click="minusItem"
            >
              <span class="material-icons-outlined">remove</span>
            </button>
            <div class="w-full text-center">
              <span class="text-2xl">{{ itemCount }}</span>
            </div>
            <button
              class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-2"
              @click="plusItem"
            >
              <span class="material-icons-outlined">add</span>
            </button>
          </div>
          <button
            class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-center text-white hover:brightness-95 active:brightness-95"
            @click="addToCart"
          >
            Добавить
          </button>
          <button class="absolute right-0 top-0 p-4" @click="resetScanner">
            <span class="material-icons-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
    <app-bottom-navigation-bar />
  </div>
</template>

<script setup>
import BarcodeScanner from "@/components/BarcodeScanner.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getPointItem } from "@/services/PointService"
import { useCartStore } from "@/stores/cart.store"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"

const store = useCartStore()
const router = useRouter()
const isStopped = ref(false)
const isNotFound = ref(false)
const resultItem = ref(null)
const itemCount = ref(1)
const isNumberInput = ref(false)
const inputNumber = ref("00000")
const isLoading = ref(false)

const setNumberInput = async (value) => {
  if (inputNumber.value === "00000") {
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
    const item = await getPointItem(id, { searchBy: "code" })
    resultItem.value = item
    isStopped.value = true
    const sound = document.getElementById("beepSound")
    sound.play()
    isNumberInput.value = false
  } catch (error) {
    console.error(error)
    isNotFound.value = true
  } finally {
    inputNumber.value = "00000"
    isLoading.value = false
  }
}

const onScanned = async (resultCode) => {
  await checkItem(resultCode)
}
</script>
