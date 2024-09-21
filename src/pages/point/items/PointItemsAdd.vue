<template>
  <a-page title="Новый товар">
    <template #header>
      <a-button primary @click="addPointItem"> Сохранить</a-button>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/store/items/add',
        }"
        class="px-4 py-2 text-blue-600 border border-blue-300 rounded-xl md:rounded bg-blue-50 hover:border-blue-500"
      >
        <p>Создать новый</p>
      </router-link>
      <router-link
        :to="{
          path: '/store/items',
          query: { selectableMode: true },
        }"
        class="px-4 py-2 border border-neutral-300 rounded-xl md:rounded bg-white hover:border-neutral-500"
      >
        <div v-if="storeItem">
          <h1 class="text-base font-medium">
            {{ storeItem.code + ", " + storeItem.name }}
          </h1>
          <p class="text-sm text-neutral-400">
            Покупка: {{ storeItem.purchasePrice }} KZT Продажа:
            {{ storeItem.sellingPrice }} KZT
          </p>
        </div>
        <p v-else>Выбрать товар...</p>
      </router-link>
      <a-base-input
        id="purchase-price"
        v-model="item.purchasePrice"
        :disabled="!storeItem"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="KZT"
      />
      <a-base-input
        id="selling-price"
        v-model="item.sellingPrice"
        :disabled="!storeItem"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="KZT"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointItemService from "@/services/point/items.js"
import { useSelect } from "@/composables/useSelect.js"
import { getStoreItem } from "@/services/StoreService.js"
import AButton from "@/components/ui/AButton.vue"

const router = useRouter()
const item = ref({})
const { selectedItem: storeItem } = useSelect(getStoreItem)

const addPointItem = async () => {
  try {
    const newPointItem = await PointItemService.addPointItem(item.value)
    onCancelNewItemClick()
    await router.push({ name: "pointItem", params: { id: newPointItem.id } })
  } catch (error) {
    console.log(error)
  }
}

const onCancelNewItemClick = () => {
  item.value = {}
  storeItem.value = null
}

watch(storeItem, (newStoreItem) => {
  if (newStoreItem) {
    item.value.storeItemId = newStoreItem.id
    item.value.purchasePrice = newStoreItem.purchasePrice
    item.value.sellingPrice = newStoreItem.sellingPrice
  }
})
</script>

<style lang="scss" scoped></style>
