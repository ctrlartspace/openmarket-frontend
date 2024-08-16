<template>
  <a-page title="Товар">
    <template #header>
      <button class="text-base font-medium text-blue-600">Сохранить</button>
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
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"

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
