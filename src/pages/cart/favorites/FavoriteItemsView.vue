<template>
  <a-page :loading="isLoading" title="Быстрые товары">
    <a-list
      v-if="favoriteItems"
      :items="favoriteItems"
      title-field="pointItem.storeItem.name"
      description-field="pointItem.sellingPrice"
      description-hint="₸"
      @on-item-click="onItemClick"
    >
      <template #title="{ item }">
        <span class="flex items-center gap-2">
          <span class="material-symbols-outlined text-neutral-300">add </span>
          {{ item.pointItem.storeItem.name }}
        </span>
      </template>
    </a-list>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"
import { useCartStore } from "@/stores/cart.store"
import AList from "@/components/ui/AList.vue"

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
