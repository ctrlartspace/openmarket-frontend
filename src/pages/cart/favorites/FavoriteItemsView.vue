<template>
  <a-page :loading="isLoading" title="Быстрые товары">
    <a-list
      v-if="favoriteItems"
      :items="favoriteItems"
      description-field="pointItem.sellingPrice"
      description-hint="₸"
      title-field="pointItem.storeItem.name"
      @on-item-click="onItemClick"
    >
      <template #description="{ item }">
        <span class="font-medium">
          {{ formatMoney(item.pointItem.sellingPrice) }}
        </span>
        <span class="font-semibold"> ₸ </span>
      </template>
    </a-list>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"
import { useCartStore } from "@/stores/cart.store"
import AList from "@/components/ui/AList.vue"
import { formatMoney } from "@/utils/format-money.js"

const { serverData: favoriteItems, sendRequest, isLoading } = useApiRequest()
const router = useRouter()
const store = useCartStore()

const onItemClick = (item) => {
  store.addItem(item.pointItem)
  router.push("/cart")
}

onMounted(async () => {
  await sendRequest("get", "/point/favorites")
})
</script>

<style lang="scss" scoped></style>
