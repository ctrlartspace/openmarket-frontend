<template>
  <a-page title="Новая касса">
    <template #header>
      <a-button primary @click="openCashRegister"> Сохранить</a-button>
    </template>
    <template #floating>
      <a-button-floating primary @click="openCashRegister">
        save</a-button-floating
      >
    </template>
    <a-base-input
      v-model="startAmount"
      placeholder="Сумма на начало"
      type="text"
      unit="₸"
    />
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import CashService from "@/services/CashService.js"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"

const router = useRouter()
const startAmount = ref("")

const openCashRegister = async () => {
  try {
    await CashService.openCashRegister(startAmount.value)

    await router.push("/cash-register/active")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
