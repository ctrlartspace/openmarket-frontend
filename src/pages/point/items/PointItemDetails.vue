<template>
  <a-page :loading="isLoading" title="Товар">
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>
      <Button fluid @click="addItemToCart">
        <span class="material-symbols-rounded">shopping_cart</span>
        <span class="font-medium"> В корзину </span>
      </Button>
      <a-modal
        #="{ props }"
        :async-operation="onAddItemToFavorites"
        title="Добавить товар в избранное?"
      >
        <Button fluid v-bind="props">
          <span class="material-symbols-rounded">star</span>
          <span class="font-medium"> В избранное </span>
        </Button>
      </a-modal>
      <Button fluid @click="applySelect(pointItem, '/point/arrivals/add')">
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Приход</span>
      </Button>
      <a-modal
        #="{ props }"
        :async-operation="updatePointItem"
        title="Сохранить изменения?"
      >
        <Button fluid severity="help" v-bind="props">
          <span class="material-symbols-rounded">save</span>
          <span class="font-medium"> Сохранить</span>
        </Button>
      </a-modal>
    </template>
    <template #floating>
      <a-button-floating @click="addItemToCart"
        >shopping_cart
      </a-button-floating>
      <a-modal
        #="{ props }"
        :async-operation="onAddItemToFavorites"
        title="Добавить товар в избранное?"
      >
        <a-button-floating v-bind="props">star</a-button-floating>
      </a-modal>
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

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> В наличии </label>
        <InputNumber
          v-model="pointItem.count"
          fluid
          locale="ru-RU"
          placeholder="Количество"
          readonly
          suffix=" шт."
        />
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
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { generateBarcodePDF } from "@/utils/barcodeGenerator"
import { useApiRequest } from "@/composables/useApiRequest"
import AList from "@/components/ui/AList.vue"
import { useSelect } from "@/composables/useSelect2.js"
import { useCartStore } from "@/stores/cart.store.js"
import { useModalStore } from "@/stores/modal.store.js"

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const modal = useModalStore()
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
  if (isItemAddingToFavoritesError.value) {
    modal.show("Ошибка", errorMessageOfItemAddingToFavorites.value)
  }
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
