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
    </a-list>

    <a-modal
      :is-open-out="noPriceItem"
      @yes="onNoPriceItemAdd"
      @no="noPriceItem = null"
      title="Цена продажи"
      yes-caption="Добавить"
    >
      <template #content>
        <a-base-input
          class="w-full"
          id="selling-price"
          v-model="noPriceItem.sellingPrice"
          placeholder="Цена продажи"
          type="number"
          unit="₸"
          v-autofocus
        />
      </template>
    </a-modal>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"
import { useCartStore } from "@/stores/cart.store"
import AList from "@/components/ui/AList.vue"
import AModal from "@/components/ui/AModal.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"

const { serverData: favoriteItems, sendRequest, isLoading } = useApiRequest()
const router = useRouter()
const store = useCartStore()
const noPriceItem = ref(null)

const onItemClick = (item) => {
  if (item.pointItem.sellingPrice === 0) {
    noPriceItem.value = item.pointItem
    return
  }
  store.addItem(item.pointItem)
  router.push("/cart")
}

const onNoPriceItemAdd = () => {
  if (noPriceItem.value) {
    store.addItem(noPriceItem.value)
    noPriceItem.value = null
    router.push("/cart")
  }
}

onMounted(async () => {
  await sendRequest("get", "/point/favorites")
})
</script>

<style lang="scss" scoped></style>
