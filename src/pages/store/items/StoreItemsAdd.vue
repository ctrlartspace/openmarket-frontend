<template>
  <a-page title="Новый товар">
    <template #header>
      <button class="text-base font-medium text-blue-600" @click="addStoreItem">
        Сохранить
      </button>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        v-model="item.code"
        id="article"
        type="text"
        placeholder="Код товара"
      />
      <a-base-input
        v-model="item.name"
        id="name"
        type="text"
        placeholder="Наименование"
      />
      <a-base-input
        v-model="item.purchasePrice"
        id="purchase-price"
        type="text"
        placeholder="Цена покупки"
      />
      <a-base-input
        v-model="item.sellingPrice"
        id="selling-price"
        type="text"
        placeholder="Цена продажи"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"

const router = useRouter()
const item = ref({})

const addStoreItem = async () => {
  try {
    await StoreService.addStoreItem(item.value)

    router.push("/store/items")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
