<template>
  <a-page title="Свободная продажа">
    <template #header>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        @click="$router.back()"
      >
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </button>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-blue-600"
        @click="addFreeItem"
      >
        <span class="material-symbols-rounded">shopping_cart</span>
        <span class="font-medium"> Добавить</span>
      </button>
    </template>
    <template #floating>
      <a-button-floating-text black solid @click="addFreeItem">
        Готово
      </a-button-floating-text>
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="addFreeItem">
      <InputNumber
        v-model="freeItem.sellingPrice"
        v-autofocus
        fluid
        inputmode="numeric"
        locale="ru-RU"
        placeholder="0 ₸"
        suffix=" ₸"
        @blur="isKeyboardVisible = false"
        @focus="isKeyboardVisible = true"
      />
      <div class="no-scrollbar mb-2 flex gap-2 overflow-auto">
        <button
          v-for="price in [
            800, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
          ]"
          :key="price"
          v-press
          class="whitespace-nowrap rounded-full bg-white px-4 py-1 font-medium"
          type="button"
          @click="freeItem.sellingPrice = price"
        >
          {{ price }} <span class="font-semibold"> ₸</span>
        </button>
      </div>
      <textarea
        v-model.trim="freeItem.comment"
        class="block w-full text-ellipsis rounded-xl border border-gray-100 bg-white px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0"
        placeholder="Комментарий"
        type="text"
      />
      <button style="display: none" type="submit"></button>
    </form>
    <!--    <teleport-->
    <!--      v-if="isKeyboardVisible && isDesktop"-->
    <!--      defer-->
    <!--      to="#keyboard-container"-->
    <!--    >-->
    <!--      <a-number-keyboard v-model.number="freeItem.sellingPrice" />-->
    <!--    </teleport>-->
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"

const isKeyboardVisible = ref(false)

const router = useRouter()
const store = useCartStore()

const freeItem = ref({ sellingPrice: "", comment: "" })

const addFreeItem = async () => {
  freeItem.value.sellingPrice = Number(freeItem.value.sellingPrice)
  if (freeItem.value.sellingPrice <= 0) {
    freeItem.value = { sellingPrice: "" }
    await router.push("/cart")
    return
  }
  store.addItem(freeItem.value)
  freeItem.value = { sellingPrice: "" }
  await router.push("/cart")
}
</script>

<style lang="scss" scoped></style>
