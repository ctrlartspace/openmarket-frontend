<template>
  <a-page title="Новый товар">
    <template #header>
      <a-button primary @click="addStoreItem"> Сохранить </a-button>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        id="article"
        v-model="item.code"
        placeholder="Код товара"
        type="text"
      />
      <a-base-input
        id="name"
        v-model="item.name"
        placeholder="Наименование"
        type="text"
      />
      <a-base-input
        id="purchase-price"
        v-model="item.purchasePrice"
        placeholder="Цена покупки"
        type="text"
      />
      <a-base-input
        id="selling-price"
        v-model="item.sellingPrice"
        placeholder="Цена продажи"
        type="text"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"

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
