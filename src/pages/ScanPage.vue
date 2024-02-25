<template>
  <div>
    <barcode-scanner :is-stopped="isStopped" @success="onScanned" />

    <div
      v-if="!resultItem && !isStopped && !isNotFound"
      class="p-4 text-center"
    >
      <p class="text-gray-300">Отсканируйте товар</p>
    </div>
    <div v-if="isNotFound" class="p-4 text-red-600 text-center">
      <p>Товар не найден</p>
      <button
        class="px-4 mt-2 border border-red-600 rounded"
        @click="resetScanner"
      >
        Повторить
      </button>
    </div>
    <div class="absolute bottom-12 left-0 right-0 p-4 mb-safe">
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
}

const checkItem = async (id) => {
  try {
    isNotFound.value = false
    const item = await getItem(id)
    resultItem.value = item
    isStopped.value = true
  } catch (error) {
    console.error(error)
    isNotFound.value = true
  }
}

const onScanned = async (resultCode) => {
  await checkItem(resultCode)
}
</script>
