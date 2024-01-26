<template>
  <div class="grid grid-cols-6 gap-4 h-96">
    <div class="col-span-6 md:col-span-4 p-2 md:p-0">
      <div class="bg-white border border-gray-200 rounded h-96">
        <div class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div
            class="relative flex-1 flex justify-between gap-2 items-center h-7"
          >
            <span class="material-icons text-gray-300">search</span>
            <v-form @submit.prevent="addCartItem" class="relative w-full">
              <video
                id="video"
                class="bg-red-100 w-full h-10 object-cover"
              ></video>
              <input
                v-show="false"
                ref="searchInput"
                v-model.trim="inputValue"
                type="text"
                class="flex-1 h-full text-lg placeholder:text-gray-300 focus:outline-none"
                :class="
                  isSearchError ? 'text-red-600 animate-shake' : 'text-black'
                "
                @input="isSearchError = false"
                placeholder="Код товара, наименование"
              />
              <div
                v-if="false"
                class="absolute w-full mt-2 bg-white border border-t-0 border-gray-200 rounded-b before:w-full before:h-0.5 before:bg-blue-600 before:absolute shadow-xl overflow-hidden"
              >
                <ul>
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
            <button class="flex items-center" @click="showReader">sdsdf</button>
          </div>
        </div>
        <table class="table-auto w-full text-lg text-left bg-white">
          <tbody>
            result:
            {{
              scanResult
            }}
            <tr
              v-if="store.groupedCartItems.length === 0"
              class="border-b flex justify-center px-4 py-2 last:border-none"
            >
              <span class="text-gray-300 text-lg">Нет данных</span>
            </tr>
            <tr
              v-else
              v-for="(item, i) in store.groupedCartItems"
              class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2"
              @click="onItemClick(item.id)"
              :key="i"
            >
              <td class="flex items-center">
                <span
                  class="material-icons rounded hover:bg-red-100 hover:text-red-700 select-none"
                  @click.stop="store.removeItem(item.id)"
                >
                  remove
                </span>
              </td>
              <td class="font-semibold flex-1">
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
    <div class="col-span-6 md:col-span-2">
      <div class="md:hidden absolute bottom-0 left-0 right-0">
        <cart-total-bar />
      </div>
      <!-- <div class="flex flex-col h-full">
        <cart-change class="" />
        <cart-total class="mt-auto" />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import CartChange from "@/components/CartChange.vue"
import CartTotal from "@/components/CartTotal.vue"
import CartTotalBar from "@/components/CartTotalBar.vue"

import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getItem } from "@/services/ItemSearch"

import { BrowserBarcodeReader, BarcodeFormat } from "@zxing/library"

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
    const item = await getItem(inputValue.value)
    store.addItem(item)
    inputValue.value = ""
    isSearchError.value = false
  } catch (error) {
    isSearchError.value = true
    console.error(error)
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
  codeReader.value = new BrowserBarcodeReader({
    formats: [BarcodeFormat.QR_CODE],
    hints: {
      tryHarder: true,
      autoFocus: true,
    },
  })
  codeReader.value.listVideoInputDevices().then((videoInputDevices) => {
    window.alert(videoInputDevices.length[1])
    selectedDeviceId.value = videoInputDevices[0].deviceId
  })
})
onBeforeUnmount(() => {
  window.removeEventListener("keypress", setInputFocus)
  codeReader = null
})

const selectedDeviceId = ref(0)
const scanResult = ref("")
const errorMsg = ref("")

const codeReader = ref(null)

const showReader = async () => {
  // const constraints = (window.constraints = {
  //   // video: {
  //   //   facingMode: { exact: "environment" },
  //   //   focusingMode: "continuous",
  //   // },
  //   video: {
  //     aspectRatio: 1.7777777778,
  //     facingMode: "environment",
  //     focusMode: "continuous",
  //     frameRate: { ideal: 30, max: 60 },
  //   },
  //   audio: false,
  // })
  // try {
  //   scanResult.value = await codeReader.value.decodeOnceFromConstraints(
  //     constraints,
  //     "video"
  //   )
  //   console.log(scanResult.value)
  //   window.alert(scanResult.value)
  // } catch (error) {
  //   window.alert(error)
  // }
  try {
    const result = codeReader.value.decodeFromInputVideoDevice(
      undefined,
      "video"
    )
    window.alert(result)
  } catch (error) {
    window.alert(error)
  }
  // codeReader.value.decodeFromInputVideoDevice(
  //   undefined,
  //   "video",
  //   (result, err) => {
  //     if (result) {
  //       console.log(result)
  //       scanResult.value = result
  //       window.alert(scanResult.value)
  //     }
  //     if (err && !(err instanceof NotFoundException)) {
  //       console.error(err)
  //       // errorMsg.value = err
  //       scanResult.value = err
  //     }
  //   }
  // )
}
</script>
