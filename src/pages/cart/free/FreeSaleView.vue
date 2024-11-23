<template>
  <a-page title="Свободная продажа">
    <template #header>
      <a-button primary @click="addFreeItem"> Добавить в корзину</a-button>
    </template>
    <template #floating>
      <a-button-floating-text black @click="addFreeItem">
        Готово
      </a-button-floating-text>
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="addFreeItem">
      <input
        class="block w-full text-ellipsis rounded-xl border border-neutral-200 bg-white px-4 py-2 font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0"
        v-model.number="freeItem.sellingPrice"
        placeholder="0 ₸"
        type="text"
        inputmode="numeric"
        @blur="isKeyboardVisible = false"
        @focus="isKeyboardVisible = true"
        v-autofocus
      />
      <div class="no-scrollbar mb-2 flex gap-2 overflow-auto">
        <button
          type="button"
          v-for="price in [800, 1000, 1500, 2000, 2500, 3000]"
          :key="price"
          class="whitespace-nowrap rounded-full bg-white px-4 py-1 font-medium"
          @click="freeItem.sellingPrice = price"
          v-press
        >
          {{ price }} <span class="font-semibold"> ₸</span>
        </button>
      </div>
      <textarea
        class="block w-full text-ellipsis rounded-xl border border-neutral-200 bg-white px-4 py-2 font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0"
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

const addFreeItem = async () => {
  freeItem.value.sellingPrice = Number(freeItem.value.sellingPrice)
  if (freeItem.value.sellingPrice <= 0) {
    freeItem.value = { sellingPrice: "" }
    router.push("/cart")
    return
  }
  store.addItem(freeItem.value)
  freeItem.value = { sellingPrice: "" }
  router.push("/cart")
}
</script>

<style lang="scss" scoped></style>
