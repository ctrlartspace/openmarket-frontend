<template>
  <a-page title="Новая касса">
    <template #header>
      <a-modal
        #="{ props }"
        title="Открыть кассу?"
        :async-operation="openCashRegister"
      >
        <a-button v-bind="props" primary> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Открыть кассу?"
        :async-operation="openCashRegister"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
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
import AModal from "@/components/ui/AModal.vue"
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
