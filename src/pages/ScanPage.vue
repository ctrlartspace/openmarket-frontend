<template>
  <div class="overflow-scroll">
    <barcode-scanner :is-stopped="isStopped" @success="onScanned" />
    <div v-if="resultItem" class="p-4 text-2xl">
      <p class="text-sm">{{ resultItem.code }}</p>
      <p>{{ resultItem.name }}</p>
      <p>{{ resultItem.purchasePrice }} KZT</p>
    </div>
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
    <div class="p-4 absolute bottom-0 left-0 right-0">
      <button
        class="w-full px-4 py-2 rounded text-center text-white bg-black flex items-center justify-center gap-2 hover:brightness-75"
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
const resultItem = ref(null)

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
