<template>
  <a-page title="Новая точка">
    <template #header>
      <a-modal
        #="{ props }"
        title="Создать новую точку?"
        :async-operation="onSaveClick"
      >
        <a-button primary v-bind="props"> Сохранить </a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Создать новую точку?"
        :async-operation="onSaveClick"
      >
        <a-button-floating v-bind="props"> save </a-button-floating>
      </a-modal>
    </template>
    <a-base-input
      id="store-point-name"
      v-model="storePointName"
      placeholder="Название точки"
      type="text"
      :is-error="validationErrors.name"
    />
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AModal from "@/components/ui/AModal.vue"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const { validationErrors, sendRequest: addStorePoint } = useApiRequest()

const router = useRouter()
const storePointName = ref("")

const onSaveClick = async () => {
  const response = await addStorePoint("post", "/store/points", {
    name: storePointName.value,
  })
  if (response) {
    router.push("/store/points")
  }
}
</script>

<style lang="scss" scoped></style>
