<template>
  <a-page title="Новый товар">
    <template #header>
      <a-modal
        #="{ props }"
        title="Добавить товар?"
        :async-operation="addPointItem"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Добавить товар?"
        :async-operation="addPointItem"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <template v-if="isError" #error>{{ errorMessage }}</template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/store/items',
          query: { selectableMode: true, nextPath: '/point/items/add' },
        }"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-500 md:rounded-lg"
      >
        <div v-if="storeItem">
          <h1 class="text-lg font-medium text-blue-600 md:text-base">
            {{ storeItem.name }}
          </h1>
          <p class="text-sm text-neutral-400">
            Код: {{ storeItem.code }}<br />
            Покупка: {{ storeItem.purchasePrice }} ₸ Продажа:
            {{ storeItem.sellingPrice }} ₸
          </p>
        </div>
        <p class="text-lg md:text-base" v-else>Выбрать товар...</p>
      </router-link>
      <div v-if="storeItem" class="flex flex-col gap-2">
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
      </div>
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
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
