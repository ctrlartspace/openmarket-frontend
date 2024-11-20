<template>
  <a-page title="Свободная продажа" no-padding>
    <template #header>
      <a-button primary @click="addFreeItem"> Добавить в корзину</a-button>
    </template>
    <template #floating>
      <a-button-floating-text black @click="addFreeItem">
        Готово
      </a-button-floating-text>
    </template>
    <div class="flex h-full flex-col gap-2 overflow-auto p-4 pb-0">
      <form class="flex flex-col gap-2" @submit.prevent="addFreeItem">
        <input
          class="block w-full text-ellipsis rounded-xl border border-none border-neutral-200 bg-white px-4 py-4 text-center text-2xl font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 md:border-solid md:py-2 md:text-left md:text-base"
          v-model.number="freeItem.sellingPrice"
          placeholder="0 ₸"
          type="number"
          @blur="isKeyboardVisible = false"
          @focus="isKeyboardVisible = true"
          v-autofocus
        />
        <input
          class="block w-full text-ellipsis rounded-xl border border-none border-neutral-200 bg-white px-4 py-4 text-center text-2xl font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 md:border-solid md:py-2 md:text-left md:text-base"
          v-model.trim="freeItem.comment"
          placeholder="Комментарий"
          type="text"
        />
        <button type="submit" style="display: none"></button>
      </form>
      <teleport
        v-if="isKeyboardVisible && isDesktop"
        defer
        to="#keyboard-container"
      >
        <a-number-keyboard v-model.number="freeItem.sellingPrice" />
      </teleport>
      <div
        v-if="!isDesktop"
        class="mt-auto grid w-full grid-cols-3 gap-2 md:max-w-[14rem]"
      >
        <button
          v-for="i in 10"
          :key="i"
          class="md:tet-base rounded-xl bg-white p-2 text-2xl font-medium md:border-neutral-200"
          :class="i - 1 === 0 ? 'order-last' : ''"
          @click="onNumberClick(i - 1)"
          v-press
        >
          {{ i - 1 }}
        </button>
        <button
          class="order-last col-span-2 flex items-center justify-center rounded-xl bg-white p-2 text-2xl font-medium text-red-600"
          v-press
          @click="onBackspaceClick"
        >
          <span class="material-symbols-rounded text-3xl">backspace</span>
        </button>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import ANumberKeyboard from "@/components/ui/ANumberKeyboard.vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

const isKeyboardVisible = ref(false)

const router = useRouter()
const store = useCartStore()

const freeItem = ref({ sellingPrice: "", comment: "" })
const comment = ref("")

const addFreeItem = async () => {
  freeItem.value.sellingPrice = Number(freeItem.value.sellingPrice)
  if (freeItem.value.sellingPrice <= 0) {
    freeItem.value = { sellingPrice: "" }
    return
  }
  store.addItem(freeItem.value)
  freeItem.value = { sellingPrice: "" }
  router.push("/cart")
}

const onNumberClick = (number) => {
  freeItem.value.sellingPrice += String(number)
}

const onBackspaceClick = () => {
  freeItem.value.sellingPrice = String(freeItem.value.sellingPrice).slice(0, -1)
}
</script>

<style lang="scss" scoped></style>
