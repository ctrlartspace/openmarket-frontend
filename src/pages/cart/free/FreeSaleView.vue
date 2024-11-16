<template>
  <a-page title="Свободный товар ">
    <template #header>
      <a-button primary @click="addFreeItem"> Добавить</a-button>
    </template>
    <template #floating>
      <a-button-floating-text primary @click="addFreeItem">
        Добавить
      </a-button-floating-text>
    </template>

    <form @submit.prevent="addFreeItem">
      <input
        ref="focusableInput"
        class="block w-full text-ellipsis rounded-xl border border-neutral-300 bg-white px-4 py-2 text-2xl font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 md:border-neutral-200 md:text-base"
        v-model.number="freeItem.sellingPrice"
        placeholder="Цена продажи"
        type="number"
      />
    </form>
    <div class="flex w-full justify-center">
      <div class="mt-4 grid w-full grid-cols-3 gap-2 md:max-w-[14rem]">
        <button
          v-for="i in 10"
          :key="i"
          class="md:tet-base rounded-xl border border-neutral-300 bg-white p-2 text-2xl font-medium md:border-neutral-200 md:text-base"
          :class="i - 1 === 0 ? 'order-last' : ''"
          @click="onNumberClick(i - 1)"
          v-press
        >
          {{ i - 1 }}
        </button>
        <button
          class="order-last col-span-2 flex items-center justify-center rounded-xl border border-neutral-300 bg-white p-2 text-2xl font-medium text-red-600 md:border-neutral-200 md:text-base"
          v-press
          @click="freeItem.sellingPrice = ''"
        >
          C
        </button>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { useFocusable } from "@/composables/useFocusable"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

const { focusableInput } = useFocusable()

const router = useRouter()
const store = useCartStore()

const freeItem = ref({ sellingPrice: "" })

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
  if (isDesktop.value) {
    focusableInput.value.focus()
  }
  freeItem.value.sellingPrice += String(number)
}
</script>

<style lang="scss" scoped></style>
