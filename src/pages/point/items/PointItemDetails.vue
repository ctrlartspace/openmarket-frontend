<template>
  <a-page :loading="isLoading">
    <template #header>
      <a-button neutral @click="addItemToCart"> В корзину </a-button>
      <a-button
        :loading="isItemAddingToFavoritesLoading"
        accent
        @click="onAddItemToFavorites"
      >
        В избранное
      </a-button>
      <a-button success @click="applySelect(item, '/point/arrivals/add')">
        Приход
      </a-button>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updatePointItem"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-button-floating @click="addItemToCart"
        >shopping_cart
      </a-button-floating>
      <a-button-floating
        :loading="isItemAddingToFavoritesLoading"
        @click="onAddItemToFavorites"
        >star
      </a-button-floating>
      <a-button-floating @click="applySelect(item, '/point/arrivals/add')"
        >add
      </a-button-floating>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updatePointItem"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <template v-if="isItemAddingToFavoritesError" #error>{{
      errorMessageOfItemAddingToFavorites
    }}</template>
    <div v-if="item" class="flex flex-col gap-2">
      <router-link
        v-if="item.storeItem"
        :to="{ path: '/store/items/' + item.storeItem.id }"
        class="rounded-xl border border-neutral-100 bg-white px-4 py-2 md:hover:bg-gray-50"
        v-press
      >
        <h1 class="font-medium text-blue-600">
          {{ item.storeItem.name }}
        </h1>
        <p class="text-sm text-neutral-400">
          Код: {{ item.storeItem.code }}<br />
          <span v-if="item.storeItem.purchasePrice">
            Покупка: {{ item.storeItem.purchasePrice }} ₸
          </span>
          <span> Продажа: {{ item.storeItem.sellingPrice }} ₸ </span>
        </p>
      </router-link>
      <div class="flex gap-2">
        <a-base-input
          v-if="item.purchasePrice"
          class="w-full"
          id="purchase-price"
          v-model="item.purchasePrice"
          label="Покупка"
          placeholder="Цена покупки"
          type="text"
          unit="₸"
        />
        <a-base-input
          class="w-full"
          id="selling-price"
          v-model="item.sellingPrice"
          label="Продажа"
          placeholder="Цена продажи"
          type="text"
          unit="₸"
        />
      </div>
      <a-base-input
        id="count"
        v-model="item.count"
        label="Количество"
        placeholder="Количество"
        readonly
        type="text"
        unit="Шт."
      />
    </div>
  </a-page>
</template>

<script setup>
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useSelect } from "@/composables/useSelect2"
import { useCartStore } from "@/stores/cart.store"
import { useApiRequest } from "@/composables/useApiRequest"

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const { applySelect } = useSelect()
const { serverData: item, sendRequest, isLoading } = useApiRequest()
const {
  sendRequest: addItemToFavorites,
  isLoading: isItemAddingToFavoritesLoading,
  isError: isItemAddingToFavoritesError,
  errorMessage: errorMessageOfItemAddingToFavorites,
} = useApiRequest()

const addItemToCart = () => {
  console.log(item.value)
  cartStore.addItem(item.value)
  router.push("/cart")
}

const onAddItemToFavorites = async () => {
  addItemToFavorites("post", "/point/favorites", { pointItemId: item.value.id })
}

const updatePointItem = async () => {
  const id = item.value.id
  if (!id) {
    return
  }
  const response = await sendRequest(
    "put",
    "/point/items/" + item.value.id,
    item.value,
  )

  if (response) {
    await sendRequest("get", "/point/items/" + response.data.data.id)
  }
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await sendRequest("get", "/point/items/" + id)
  }
})
</script>

<style lang="scss" scoped></style>
