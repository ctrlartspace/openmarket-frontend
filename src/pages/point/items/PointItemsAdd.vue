<template>
  <a-page title="Новый товар">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="addPointItem"
        title="Добавить товар?"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="addPointItem"
        title="Добавить товар?"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <template v-if="isError" #error>{{ errorMessage }}</template>
    <div class="flex flex-col gap-2">
      <router-link
        v-press
        :to="{
          path: '/store/items',
          query: { selectableMode: true, nextPath: '/point/items/add' },
        }"
        class="rounded-xl border border-gray-100 bg-white px-4 py-3 hover:border-gray-500"
      >
        <div v-if="storeItem">
          <h1 class="font-medium text-blue-600">
            {{ storeItem.name }}
          </h1>
          <p class="text-sm text-gray-400">
            Код: {{ storeItem.code }}<br />
            Покупка: {{ storeItem.purchasePrice }} ₸ Продажа:
            {{ storeItem.sellingPrice }} ₸
          </p>
        </div>
        <p v-else class=" ">Выбрать товар...</p>
      </router-link>

      <div v-if="storeItem" class="flex gap-2">
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Покупка </label>
          <InputNumber
            v-model="item.purchasePrice"
            fluid
            locale="ru-RU"
            placeholder="Цена покупки"
            suffix=" ₸"
          />
        </div>
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Продажа </label>
          <InputNumber
            v-model="item.sellingPrice"
            fluid
            locale="ru-RU"
            placeholder="Цена продажи"
            suffix=" ₸"
          />
        </div>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useSelect } from "@/composables/useSelect2.js"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const item = ref({})
const { selectedItem: storeItem } = useSelect()
const { sendRequest, errorMessage, isError } = useApiRequest()

const addPointItem = async () => {
  const response = await sendRequest("post", "/point/items", item.value)
  if (response) {
    onCancelNewItemClick()
    await router.push({ path: "/point/items/" + response.data.data.id })
  }
}

const onCancelNewItemClick = () => {
  item.value = {}
  storeItem.value = null
}

watch(storeItem, (newStoreItem) => {
  if (newStoreItem) {
    item.value.storeItemId = newStoreItem.id
    item.value.purchasePrice = newStoreItem.purchasePrice
    item.value.sellingPrice = newStoreItem.sellingPrice
  }
})
</script>

<style lang="scss" scoped></style>
