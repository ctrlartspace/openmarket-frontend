<template>
  <div class="flex h-full flex-col bg-white dark:bg-neutral-900">
    <div class="relative flex flex-1 flex-col">
      <div class="aspect-square w-full bg-gray-100 p-2 dark:bg-black">
        <qrcode-stream
          :constraints="selectedConstraints"
          :formats="selectedBarcodeFormats"
          :paused="isPaused"
          :torch="isTorchOn"
          :track="paintOutline"
          class="overflow-hidden rounded-xl bg-gray-200 dark:bg-neutral-900"
          @detect="onDetect"
          @error="onError"
        >
          <div class="flex h-full items-end justify-center p-4 text-white">
            <button
              :class="{ 'opacity-40': !isTorchOn }"
              @click="isTorchOn = !isTorchOn"
            >
              <span class="material-symbols-rounded text-4xl"
                >flashlight_on</span
              >
            </button>
          </div>
        </qrcode-stream>
      </div>
      <div class="flex-1 bg-gray-100 p-8 dark:bg-black">
        <div
          v-if="!resultItem && !isNotFound"
          class="w-full rounded-xl bg-white p-4 text-center font-medium dark:bg-neutral-900"
        >
          <span class="text-black dark:text-neutral-200">
            Сканируйте штрихкод
          </span>
          <!--          @click="onDetect([{ rawValue: 6974443385731 }])"-->
        </div>
        <div v-if="isNotFound && !isScannableMode">
          <div
            :class="[
              isNotFound ? 'animate-shake will-change-transform' : 'text-black',
              'flex w-full flex-col justify-between text-ellipsis rounded-xl border border-gray-100 bg-white px-4 py-3 font-medium text-red-600 placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-red-400',
            ]"
          >
            <div class="rounded-xl bg-red-50 p-6 dark:bg-red-900/20">
              <p class="flex items-center gap-2">
                {{ result }}
              </p>
              <span class="font-normal">Штрихкод не найден</span>
            </div>
            <cart-item-dialog
              #="{ props }"
              :code="result"
              @success="checkItem(result)"
            >
              <button
                v-press
                class="mt-2 flex justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300"
                v-bind="props"
              >
                <span class="material-symbols-rounded">add_shopping_cart</span>
                <span class="font-medium">Создать</span>
              </button>
            </cart-item-dialog>
          </div>
        </div>

        <div
          v-if="resultItem"
          class="absolute bottom-0 left-0 right-0 flex h-full animate-fade items-end justify-center bg-black bg-opacity-30 p-6 backdrop-blur-md"
        >
          <div
            class="relative w-full rounded-xl border border-white bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
          >
            <p class="text-gray-300 dark:text-neutral-600">
              {{ resultItem.code }}
            </p>
            <p class="mt-2 text-2xl font-medium">{{ resultItem.name }}</p>
            <p class="text-2xl">{{ formatMoney(resultItem.sellingPrice) }} ₸</p>
            <div class="mt-2 flex items-center justify-between gap-2">
              <button
                v-press
                class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-2 dark:bg-neutral-800"
                @click="minusItem"
              >
                <span class="material-symbols-rounded">remove</span>
              </button>
              <div class="w-full text-center">
                <span class="text-2xl">{{ itemCount }} шт.</span>
              </div>
              <button
                v-press
                class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-2 dark:bg-neutral-800"
                @click="plusItem"
              >
                <span class="material-symbols-rounded">add</span>
              </button>
            </div>
            <button
              v-press
              class="mt-4 flex w-full items-center justify-center gap-4 rounded-xl bg-black px-4 py-3 text-center font-medium text-white hover:brightness-95 active:brightness-95 dark:border dark:border-neutral-800"
              @click="onApplyClick"
            >
              Готово
            </button>
            <button class="absolute right-0 top-0 p-6" @click="resetScanner">
              <span
                class="material-symbols-rounded text-gray-300 dark:text-neutral-600"
                >close</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <app-bottom-navigation-bar />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { QrcodeStream } from "vue-qrcode-reader"
import { useCartStore } from "@/stores/cart.store"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
import { getPointItem } from "@/services/PointService"
import { useScan } from "@/composables/useScan"
import { formatMoney } from "@/utils/format-money"
import CartItemDialog from "@/components/NewItemDialog.vue"

const sound = new Audio("/beep.wav")
const { isScannableMode, applyScan } = useScan()

const resultCount = ref(0)
const result = ref("")
const resultItem = ref(null)
const isNotFound = ref(false)
const isPaused = ref(false)
const isLoading = ref(false)
const isTorchOn = ref(false)

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
  resetScanner()
}

const resetScanner = () => {
  resultItem.value = null
  isNotFound.value = false
  isPaused.value = false
  itemCount.value = 1
}

async function onDetect(detectedCodes) {
  result.value = detectedCodes[0].rawValue
  resultCount.value = resultCount.value + 1
  if (isScannableMode.value) {
    playSound()
    await applyScan(result.value)
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
  width: { ideal: 1500 },
  height: { ideal: 1500 },
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
  qr_code: false,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
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
