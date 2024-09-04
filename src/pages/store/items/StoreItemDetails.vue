<template>
  <a-page title="Товар">
    <template #header>
      <a-button primary>Сохранить</a-button>
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
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import AButton from "@/components/ui/AButton.vue"

const route = useRoute()
const item = ref({})

const getStoreItem = async (id) => {
  try {
    item.value = await StoreService.getStoreItem(id)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  const id = route.params.id
  if (id) {
    getStoreItem(id)
  }
})
</script>

<style lang="scss" scoped></style>
