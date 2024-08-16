<template>
  <a-page title="Новый товар">
    <template #header>
      <button class="text-base font-medium text-blue-600" @click="addPointItem">
        Сохранить
      </button>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        v-if="storeItem"
        :to="{
          path: '/point/items/store-items',
        }"
        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100 hover:border-neutral-500"
      >
        <h1 class="text-base font-medium">
          {{ storeItem.code + ", " + storeItem.name }}
        </h1>
        <p class="text-sm text-neutral-400">
          Покупка: {{ storeItem.purchasePrice }} KZT Продажа:
          {{ storeItem.sellingPrice }} KZT
        </p>
      </router-link>
      <router-link
        v-else
        :to="{
          path: '/point/items/store-items',
          query: { from: 'pointItemsAdd' },
        }"
        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100 hover:border-neutral-500"
      >
        Выбрать товар
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
      <a-base-input
        id="filters"
        v-model="filters"
        :disabled="!storeItem"
        label="Фильтры"
        placeholder="Фильтры"
        type="text"
        @click="$router.push(filterPathMulti)"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointItemService from "@/services/point/items.js"
import { useFilters } from "@/composables/filters.js"
import { useStoreItem } from "@/composables/storeItem.js"

const router = useRouter()
const item = ref({})
const { filters, filterPathMulti } = useFilters()
const { storeItem } = useStoreItem()

const addPointItem = async () => {
  try {
    const pointItem = PointItemService.addPointItem(item.value)
    router.push({ name: "pointItems" })
  } catch (error) {
    console.log(error)
  }
}

watch(storeItem, (newStoreItem) => {
  item.value.storeItemId = newStoreItem.id
  item.value.purchasePrice = newStoreItem.purchasePrice
  item.value.sellingPrice = newStoreItem.sellingPrice
})
</script>

<style lang="scss" scoped></style>
