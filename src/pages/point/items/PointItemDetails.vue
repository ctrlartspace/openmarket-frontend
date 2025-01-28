<template>
  <a-page :loading="isLoading">
    <template #header>
      <a-button gray @click="addItemToCart"> В корзину</a-button>
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
        :async-operation="updatePointItem"
        title="Сохранить изменения?"
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
        :async-operation="updatePointItem"
        title="Сохранить изменения?"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <template v-if="isItemAddingToFavoritesError" #error
      >{{ errorMessageOfItemAddingToFavorites }}
    </template>
    <div v-if="item" class="flex flex-col gap-2">
      <router-link
        v-if="item.storeItem"
        v-press
        :to="{ path: '/store/items/' + item.storeItem.id }"
        class="rounded-xl border border-gray-100 bg-white px-4 py-3 md:hover:border-gray-300"
      >
        <h1 class="font-medium text-blue-600">
          {{ item.storeItem.name }}
        </h1>
        <p class="text-sm text-gray-400">
          Код: {{ item.storeItem.code }}<br />
          <span v-if="item.storeItem.purchasePrice">
            Покупка: {{ item.storeItem.purchasePrice }} ₸
          </span>
          <span> Продажа: {{ item.storeItem.sellingPrice }} ₸ </span>
        </p>
      </router-link>

      <div class="flex gap-2">
        <div v-if="item.purchasePrice" class="flex-auto">
          <label class="mb-2 block font-medium"> Покупка </label>
          <InputNumber
            v-model="item.purchasePrice"
            fluid
            placeholder="Цена покупки"
            suffix=" ₸"
          />
        </div>
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Продажа </label>
          <InputNumber
            v-model="item.sellingPrice"
            fluid
            placeholder="Цена продажи"
            suffix=" ₸"
          />
        </div>
      </div>

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> В наличии </label>
        <InputNumber
          v-model="item.count"
          fluid
          placeholder="0 шт"
          readonly
          suffix=" шт"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
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
