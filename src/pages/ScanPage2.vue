<template>
  <div class="flex h-full flex-col gap-2">
    <div class="aspect-square w-full">
      <qrcode-stream
        :constraints="selectedConstraints"
        :track="paintOutline"
        :formats="selectedBarcodeFormats"
        @error="onError"
        @detect="onDetect"
        :paused="isPaused"
      >
        <div
          class="flex h-full items-end justify-center p-4 text-white opacity-40"
        >
          {{ result }}
        </div>
      </qrcode-stream>
    </div>
    <div class="relative flex-1 p-4">
      <div v-if="!resultItem && !isNotFound">
        <p
          class="rounded-xl bg-blue-50 px-4 py-2 text-center text-lg text-blue-600 md:text-base"
        >
          Сканируйте штрихкод
        </p>
      </div>
      <div
        v-if="isNotFound && !isScannableMode"
        class="flex justify-center font-medium"
      >
        <span class="rounded-lg bg-red-50 px-4 py-2 text-red-500">
          Товар не найден ({{ resultCount }})
        </span>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <div
          v-if="resultItem"
          class="relative rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <p class="text-sm">{{ resultItem.code }}</p>
          <p class="text-2xl">{{ resultItem.name }}</p>
          <p class="text-2xl">{{ resultItem.sellingPrice }} ₸</p>
          <div class="mt-2 flex items-center justify-between gap-2">
            <button
              class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-2"
              @click="minusItem"
              v-press
            >
              <span class="material-symbols-outlined">remove</span>
            </button>
            <div class="w-full text-center">
              <span class="text-2xl">{{ itemCount }}</span>
            </div>
            <button
              class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-2"
              @click="plusItem"
              v-press
            >
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
          <button
            class="mt-4 flex w-full items-center justify-center gap-4 rounded-xl bg-black px-4 py-2 text-center text-2xl font-medium text-white hover:brightness-95 active:brightness-95"
            @click="onApplyClick"
            v-press
          >
            Готово
          </button>
          <button class="absolute right-0 top-0 p-4" @click="resetScanner">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
    <app-bottom-navigation-bar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { QrcodeStream } from "vue-qrcode-reader"
import { useCartStore } from "@/stores/cart.store"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
import { getPointItem } from "@/services/PointService"
import { useScan } from "@/composables/useScan"

const sound = new Audio("/beep.wav")
const { isScannableMode, applyScan } = useScan()

const resultCount = ref(0)
const result = ref("")
const resultItem = ref(null)
const isNotFound = ref(false)
const isPaused = ref(false)
const isLoading = ref(false)

const store = useCartStore()
const itemCount = ref(1)

const minusItem = () => {
  if (itemCount.value > 1) {
    itemCount.value -= 1
  }
}
const plusItem = () => {
  itemCount.value += 1
}

const onApplyClick = () => {
  if (isScannableMode.value) {
    applyScan(result.value)
    return
  }
  addToCart()
}

const addToCart = () => {
  store.addItem(resultItem.value, itemCount.value)
  resultItem.value = null
  itemCount.value = 1
  isPaused.value = false
}

const resetScanner = () => {
  resultItem.value = null
  isNotFound.value = false
  isPaused.value = false
}

async function onDetect(detectedCodes) {
  result.value = detectedCodes[0].rawValue
  resultCount.value = resultCount.value + 1
  if (isScannableMode.value) {
    playSound()
    applyScan(result.value)
  } else {
    await checkItem(result.value)
  }
}

const checkItem = async (id) => {
  try {
    isLoading.value = true
    isNotFound.value = false
    const item = await getPointItem(id, { searchBy: "code" })
    resultItem.value = item
    isPaused.value = true
    playSound()
  } catch (error) {
    console.error(error)
    isNotFound.value = true
  } finally {
    isLoading.value = false
  }
}

const playSound = () => {
  sound.play()
}

/*** select camera ***/

const selectedConstraints = ref({
  facingMode: "environment",
  width: { ideal: 1080 },
  height: { ideal: 1080 },
  advanced: [
    { focusMode: "continuous" }, // Включение автофокуса
  ],
})

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = "red"

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

/*** barcode formats ***/

const barcodeFormats = ref({
  aztec: false,
  code_128: true,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: true,
  ean_8: true,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: true,
  upc_e: true,
  linear_codes: false,
  matrix_codes: false,
})
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format],
  )
})

/*** error handling ***/

const error = ref("")

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission"
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device"
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)"
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?"
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable"
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser"
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP."
  } else {
    error.value += err.message
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
  display: inline-block;
}
</style>
