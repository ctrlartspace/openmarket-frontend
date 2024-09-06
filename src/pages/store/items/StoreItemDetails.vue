<template>
  <a-page title="Товар">
    <template #header>
      <a-button v-if="point" accent @click="addPointItem"
        >Добавить в точку
      </a-button>
      <a-button primary @click="updateStoreItem">Сохранить</a-button>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        id="article"
        v-model="itemState.code"
        label="Код товара"
        placeholder="Код товара"
        type="text"
      />
      <a-base-input
        id="name"
        v-model="itemState.name"
        label="Наименование"
        placeholder="Наименование"
        type="text"
      />
      <a-base-input
        id="purchase-price"
        v-model="itemState.purchasePrice"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="KZT"
      />
      <a-base-input
        id="selling-price"
        v-model="itemState.sellingPrice"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="KZT"
      />
      <a-base-input
        id="filters"
        v-model="filters"
        label="Категории"
        placeholder="Выбрать"
        type="text"
        @click="$router.push(filterPathMulti)"
      />
    </div>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import AButton from "@/components/ui/AButton.vue"
import { useFilters } from "@/composables/filters.js"
import { storeToRefs } from "pinia"
import { useItemState } from "@/stores/item-state.store.js"
import { useUserStore } from "@/stores/user.store.js"
import PointItemService from "@/services/point/items.js"

const route = useRoute()
const router = useRouter()
const { itemState } = storeToRefs(useItemState())
const { filters, filterPathMulti } = useFilters()
const { point } = useUserStore()

const getStoreItem = async (id) => {
  try {
    itemState.value = await StoreService.getStoreItem(id)
    if (filters.value) {
      itemState.value.filters = filters
    } else {
      filters.value = itemState.value.filters
    }
  } catch (error) {
    console.error(error)
  }
}

const updateStoreItem = async () => {
  try {
    if (itemState.value.id) {
      itemState.value.filters = filters.value
      const updatedItem = await StoreService.updateStoreItem(
        itemState.value.id,
        itemState.value,
      )
      const { id } = updatedItem
      await getStoreItem(id)
    } else {
      console.log("id not found")
    }
  } catch (error) {
    console.error(error)
  }
}

const addPointItem = async () => {
  try {
    const data = {
      storeItemId: itemState.value.id,
      sellingPrice: itemState.value.sellingPrice,
      purchasePrice: itemState.value.purchasePrice,
    }

    const newPointItem = await PointItemService.addPointItem(data)
    await router.push({ name: "pointItem", params: { id: newPointItem.id } })
  } catch (error) {
    console.log(error)
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
