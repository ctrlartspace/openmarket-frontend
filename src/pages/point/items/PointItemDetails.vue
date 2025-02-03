<template>
  <a-page :loading="isLoading" title="Товар">
    <template #header>
      <a-button gray @click="addItemToCart"> В корзину</a-button>
      <a-button
        :loading="isItemAddingToFavoritesLoading"
        accent
        @click="onAddItemToFavorites"
      >
        В избранное
      </a-button>
      <a-button success @click="applySelect(pointItem, '/point/arrivals/add')">
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
      <a-button-floating @click="applySelect(pointItem, '/point/arrivals/add')"
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
    <template v-if="isError" #error>{{ errorMessage }}</template>
    <div v-if="pointItem" class="flex flex-col gap-2">
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Код товара </label>
        <InputGroup>
          <InputText v-model="pointItem.code" type="text" />
          <InputGroupAddon>
            <Button
              severity="secondary"
              variant="text"
              @click="onGenerateBarcodeClick"
            >
              <template #icon>
                <span class="material-symbols-rounded">print</span>
              </template>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Наименование </label>
        <InputText v-model="pointItem.name" fluid type="text" />
      </div>
      <div class="flex gap-2">
        <div v-if="pointItem.purchasePrice" class="flex-auto">
          <label class="mb-2 block font-medium"> Покупка </label>
          <InputNumber
            v-model="pointItem.purchasePrice"
            fluid
            locale="ru-RU"
            placeholder="Цена покупки"
            suffix=" ₸"
          />
        </div>
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Продажа </label>
          <InputNumber
            v-model="pointItem.sellingPrice"
            fluid
            locale="ru-RU"
            placeholder="Цена продажи"
            suffix=" ₸"
          />
        </div>
      </div>
      <div v-if="pointItem.availability?.length > 0" class="mt-4 flex-auto">
        <label class="mb-2 block font-medium">Наличие в точках</label>
        <a-list
          :items="pointItem.availability"
          description-field="count"
          description-hint="шт."
          title-field="pointName"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { generateBarcodePDF } from "@/utils/barcodeGenerator"
import { useApiRequest } from "@/composables/useApiRequest"
import AList from "@/components/ui/AList.vue"
import { useSelect } from "@/composables/useSelect2.js"
import { useCartStore } from "@/stores/cart.store.js"

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const { applySelect } = useSelect()
const {
  serverData: pointItem,
  sendRequest,
  isLoading,
  isError,
  errorMessage,
} = useApiRequest()
const {
  sendRequest: addItemToFavorites,
  isLoading: isItemAddingToFavoritesLoading,
  isError: isItemAddingToFavoritesError,
  errorMessage: errorMessageOfItemAddingToFavorites,
} = useApiRequest()

const fetchPointItem = async (id) => {
  await sendRequest("get", "/point/items/" + id)
}
const onAddItemToFavorites = async () => {
  await addItemToFavorites("post", "/point/favorites", {
    pointItemId: pointItem.value.id,
  })
}
const addItemToCart = () => {
  cartStore.addItem(pointItem.value)
  router.push("/cart")
}

const updatePointItem = async () => {
  const id = pointItem.value.id
  if (id) {
    await sendRequest("put", "/point/items/" + id, pointItem.value)
  }
}

const onGenerateBarcodeClick = () => {
  generateBarcodePDF(pointItem.value.code)
}

onMounted(() => {
  const id = route.params.id
  if (id) {
    fetchPointItem(id)
  }
})
</script>

<style lang="scss" scoped></style>
