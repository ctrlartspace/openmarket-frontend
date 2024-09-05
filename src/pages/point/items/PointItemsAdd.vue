<template>
  <a-page title="Новый товар">
    <template #header>
      <a-button primary @click="addPointItem"> Сохранить</a-button>
    </template>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <button
          v-if="!isNewItem && !storeItem"
          class="text-left text-blue-600 px-4 py-2 border border-blue-300 rounded bg-blue-50 hover:border-blue-500"
          @click="onNewItemClick"
        >
          Создать новый
        </button>
        <div
          v-if="isNewItem && !storeItem"
          class="flex items-center justify-between text-left text-green-600 px-4 py-2 border border-green-300 rounded bg-green-50"
        >
          Будет создан новый товар
          <a-button success @click="onCancelNewItemClick">Отмена</a-button>
        </div>
      </div>
      <router-link
        v-if="!isNewItem"
        :to="{
          path: '/store/items',
          query: { selectableMode: true },
        }"
        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100 hover:border-neutral-500"
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
        <p v-else>Выбрать товар</p>
      </router-link>
      <div v-if="storeItem || isNewItem" class="flex flex-col gap-2">
        <a-base-input
          v-if="isNewItem"
          id="article"
          v-model="itemState.code"
          label="Код товара"
          placeholder="Код товара"
          type="text"
        />
        <a-base-input
          v-if="isNewItem"
          id="name"
          v-model="itemState.name"
          label="Наименование"
          placeholder="Наименование"
          type="text"
        />
        <a-base-input
          id="purchase-price"
          v-model="itemState.purchasePrice"
          :disabled="!storeItem && !isNewItem"
          label="Цена покупки"
          placeholder="Цена покупки"
          type="text"
          unit="KZT"
        />
        <a-base-input
          id="selling-price"
          v-model="itemState.sellingPrice"
          :disabled="!storeItem && !isNewItem"
          label="Цена продажи"
          placeholder="Цена продажи"
          type="text"
          unit="KZT"
        />
        <a-base-input
          id="filters"
          v-model="filters"
          :disabled="!storeItem && !isNewItem"
          label="Фильтры"
          placeholder="Фильтры"
          type="text"
          @click="$router.push(filterPathMulti)"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { watch } from "vue"
import { useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointItemService from "@/services/point/items.js"
import { useFilters } from "@/composables/filters.js"
import { useSelect } from "@/composables/useSelect.js"
import { getStoreItem } from "@/services/StoreService.js"
import AButton from "@/components/ui/AButton.vue"
import { useItemState } from "@/stores/item-state.store.js"
import { storeToRefs } from "pinia"

const router = useRouter()
const { itemState, isNewItem } = storeToRefs(useItemState())
const { filters, filterPathMulti } = useFilters()
const { selectedItem: storeItem } = useSelect(getStoreItem)

const addPointItem = async () => {
  try {
    itemState.value.filters = filters.value
    const newPointItem = await PointItemService.addPointItem(itemState.value)
    onCancelNewItemClick()
    await router.push({ name: "pointItem", params: { id: newPointItem.id } })
  } catch (error) {
    console.log(error)
  }
}

const onNewItemClick = () => {
  isNewItem.value = true
  storeItem.value = null
}

const onCancelNewItemClick = () => {
  itemState.value = {}
  isNewItem.value = false
  storeItem.value = null
  filters.value = null
}

watch(storeItem, (newStoreItem) => {
  if (newStoreItem) {
    itemState.value.storeItemId = newStoreItem.id
    itemState.value.purchasePrice = newStoreItem.purchasePrice
    itemState.value.sellingPrice = newStoreItem.sellingPrice
  }
})
</script>

<style lang="scss" scoped></style>
