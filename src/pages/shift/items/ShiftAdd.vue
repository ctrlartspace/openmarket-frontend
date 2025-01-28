<template>
  <a-page title="Новая смена">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="openCashRegister"
        title="Открыть смену?"
      >
        <a-button primary v-bind="props"> Готово</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="openCashRegister"
        title="Открыть смену?"
      >
        <a-button-floating-text primary v-bind="props">
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>

    <div class="flex-auto">
      <label class="mb-2 block font-medium"> Сумма на начало</label>
      <InputNumber
        v-model="startAmount"
        :invalid="validationErrors.startAmount"
        fluid
        placeholder="0 ₸"
        suffix=" ₸"
      />
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"

const { sendRequest, validationErrors } = useApiRequest()
const router = useRouter()
const startAmount = ref(null)

const openCashRegister = async () => {
  const response = await sendRequest("post", "/cash-registers", {
    startAmount: startAmount.value,
  })
  if (response) {
    await router.push("/shift/last")
  }
}
</script>

<style lang="scss" scoped></style>
