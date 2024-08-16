<template>
  <a-page title="Новая точка">
    <template #header>
      <button
        class="text-base font-medium text-blue-600"
        @click="addStorePoint"
      >
        Сохранить
      </button>
    </template>
    <a-base-input
      v-model="storePointName"
      id="store-point-name"
      type="text"
      placeholder="Название точки"
    />
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"

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
