<template>
  <a-page title="Новая касса">
    <template #header>
      <a-button primary @click="openCashRegister"> Сохранить</a-button>
    </template>
    <a-base-input
      v-model="startAmount"
      placeholder="Сумма на начало"
      type="text"
    />
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import CashService from "@/services/CashService.js"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"

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
