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
        <a-button-floating primary v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/store/items/add',
        }"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-lg text-blue-600 hover:border-blue-500 md:rounded-lg md:text-base"
      >
        <p>Создать новый</p>
      </router-link>
      <router-link
        :to="{
          path: '/store/items',
          query: { selectableMode: true },
        }"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-500 md:rounded-lg"
      >
        <div v-if="storeItem">
          <h1 class="text-lg font-medium md:text-base">
            {{ storeItem.code + ", " + storeItem.name }}
          </h1>
          <p class="text-md text-neutral-400 md:text-sm">
            Покупка: {{ storeItem.purchasePrice }} KZT Продажа:
            {{ storeItem.sellingPrice }} KZT
          </p>
        </div>
        <p class="text-lg md:text-base" v-else>Выбрать товар...</p>
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
    </div>
  </a-page>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointItemService from "@/services/point/items.js"
import { useSelect } from "@/composables/useSelect2.js"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"

const router = useRouter()
const item = ref({})
const { selectedItem: storeItem } = useSelect()

const addPointItem = async () => {
  try {
    const newPointItem = await PointItemService.addPointItem(item.value)
    onCancelNewItemClick()
    await router.push({ path: "/point/items/" + newPointItem.id })
  } catch (error) {
    console.log(error)
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
