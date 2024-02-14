<template>
  <div>
    <barcode-scanner :is-stopped="isStopped" @success="onScanned" />

    <div
      v-if="!resultItem && !isStopped && !isNotFound"
      class="p-4 text-center"
    >
      <p>Отсканируйте товар</p>
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
    <div class="absolute bottom-8 left-0 right-0 p-4 mb-safe">
      <div
        v-if="resultItem"
        class="relative p-4 mb-4 rounded bg-white shadow-lg"
      >
        <p class="text-sm">{{ resultItem.code }}</p>
        <p class="text-2xl">{{ resultItem.name }}</p>
        <p class="text-2xl">{{ resultItem.purchasePrice }} KZT</p>
        <div class="mt-2 flex gap-2 justify-between items-center">
          <button
            class="w-full p-2 bg-gray-100 flex items-center justify-center rounded"
          >
            <span class="material-icons-outlined">remove</span>
          </button>
          <div class="w-full text-center">
            <span class="text-2xl">1</span>
          </div>
          <button
            class="w-full p-2 bg-gray-100 flex items-center justify-center rounded"
          >
            <span class="material-icons-outlined">add</span>
          </button>
        </div>
        <button
          class="mt-4 w-full px-4 py-2 rounded text-center text-white bg-green-400 flex items-center justify-center gap-2 hover:brightness-95"
        >
          Добавить
        </button>
        <button class="absolute top-0 right-0 p-4" @click="resetScanner">
          <span class="material-icons-outlined">close</span>
        </button>
      </div>
      <button
        class="w-full px-4 py-2 rounded text-center text-white bg-black flex items-center justify-center gap-2 hover:brightness-75 shadow-lg"
        @click="backToCart"
      >
        <span class="material-icons-outlined">arrow_back</span>
        Корзина
      </button>
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
const resultItem = ref({ code: 12312313, name: "Item 1", purchasePrice: 2000 })

const resetScanner = () => {
  resultItem.value = null
  isStopped.value = false
  isNotFound.value = false
}

const backToCart = () => {
  router.push("/cart")
}

const checkItem = async (id) => {
  try {
    isNotFound.value = false
    const item = await getItem(id)
    resultItem.value = item
    store.addItem(item)
    console.log("item", item)
  } catch (error) {
    console.error(error)
    isNotFound.value = true
  }
}

const onScanned = async (resultCode) => {
  isStopped.value = true
  await checkItem(resultCode)
}
</script>
