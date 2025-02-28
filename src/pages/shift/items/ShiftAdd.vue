<template>
  <a-page title="Новая смена">
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>
      <a-modal
        #="{ props }"
        :async-operation="openCashRegister"
        title="Открыть смену?"
      >
        <Button fluid severity="help" v-bind="props">
          <span class="material-symbols-rounded">done</span>
          <span class="font-medium"> Готово</span>
        </Button>
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
      <label class="mb-2 block font-medium dark:text-neutral-200">
        Сумма на начало</label
      >
      <InputNumber
        v-model="startAmount"
        v-autofocus
        :invalid="validationErrors?.startAmount"
        fluid
        locale="ru-RU"
        placeholder="0 ₸"
        suffix=" ₸"
      />
    </div>
  </a-page>
</template>

<script setup>
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"
import { useModalStore } from "@/stores/modal.store.js"

const { sendRequest, isError, errorMessage, validationErrors } = useApiRequest()
const router = useRouter()
const startAmount = ref(null)
const modal = useModalStore()

const openCashRegister = async () => {
  await sendRequest("post", "/point/work-shifts", {
    startAmount: startAmount.value,
  })
  if (isError.value) {
    modal.show("Ошибка", errorMessage.value)
    return
  }

  await router.push("/work-shifts/last")
}
</script>

<style lang="scss" scoped></style>
