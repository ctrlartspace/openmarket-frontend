<template>
  <a-page title="Новая точка">
    <template #header>
      <a-button primary @click="addStorePoint"> Сохранить </a-button>
    </template>
    <template #floating>
      <a-button-floating primary @click="addStorePoint">
        save
      </a-button-floating>
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
