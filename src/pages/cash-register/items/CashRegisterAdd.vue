<template>
  <a-page title="Новая смена">
    <template #header>
      <a-modal
        #="{ props }"
        title="Открыть смену?"
        :async-operation="openCashRegister"
      >
        <a-button v-bind="props" primary> Готово</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Открыть смену?"
        :async-operation="openCashRegister"
      >
        <a-button-floating-text primary v-bind="props">
          Готово</a-button-floating-text
        >
      </a-modal>
    </template>
    <a-base-input
      v-model="startAmount"
      placeholder="Сумма на начало"
      type="text"
      unit="₸"
      :is-error="validationErrors.startAmount"
    />
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AModal from "@/components/ui/AModal.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"

const { sendRequest, validationErrors } = useApiRequest()
const router = useRouter()
const startAmount = ref("")

const openCashRegister = async () => {
  const response = await sendRequest("post", "/cash-registers", {
    startAmount: startAmount.value,
  })
  if (response) {
    await router.push("/cash-register/active")
  }
}
</script>

<style lang="scss" scoped></style>
