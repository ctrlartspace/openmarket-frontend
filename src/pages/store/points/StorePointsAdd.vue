<template>
  <a-page title="Новая точка">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="onSaveClick"
        title="Создать новую точку?"
      >
        <button
          class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
          v-bind="props"
        >
          <span class="material-symbols-rounded">save</span>
          <span class="font-medium"> Сохранить </span>
        </button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="onSaveClick"
        title="Создать новую точку?"
      >
        <a-button-floating-text primary v-bind="props">
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <template v-if="isError" #error>{{ errorMessage }}</template>
    <a-base-input
      id="store-point-name"
      v-model="storePointName"
      :is-error="validationErrors?.name"
      placeholder="Название точки"
      type="text"
    />
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AModal from "@/components/ui/AModal.vue"
import { useRouter } from "vue-router"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const {
  validationErrors,
  sendRequest: addStorePoint,
  isError,
  errorMessage,
} = useApiRequest()

const router = useRouter()
const storePointName = ref("")

const onSaveClick = async () => {
  const response = await addStorePoint("post", "/store/points", {
    name: storePointName.value,
  })
  if (response) {
    await router.push("/store/info")
  }
}
</script>

<style lang="scss" scoped></style>
