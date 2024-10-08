<template>
  <a-page title="Новая точка">
    <template #header>
      <a-modal
        #="{ props }"
        title="Создать новую точку?"
        :async-operation="addStorePoint"
      >
        <a-button primary v-bind="props"> Сохранить </a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Создать новую точку?"
        :async-operation="addStorePoint"
      >
        <a-button-floating v-bind="props"> save </a-button-floating>
      </a-modal>
    </template>
    <a-base-input
      id="store-point-name"
      v-model="storePointName"
      placeholder="Название точки"
      type="text"
    />
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AModal from "@/components/ui/AModal.vue"
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"

const router = useRouter()
const storePointName = ref("")

const addStorePoint = async () => {
  try {
    await StoreService.addStorePoint({
      name: storePointName.value,
    })

    router.push("/store/points")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
