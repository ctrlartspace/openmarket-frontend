<template>
  <a-page title="Новый товар">
    <template #header>
      <a-modal
        #="{ props }"
        title="Создать товар?"
        :async-operation="addStoreItem"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Создать товар?"
        :async-operation="addStoreItem"
      >
        <a-button-floating primary v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        id="article"
        v-model="itemState.code"
        label="Код товара"
        placeholder="Код товара"
        type="text"
      >
        <template #action>
          <router-link
            :to="{
              path: '/scan2',
              query: { scannableMode: true },
            }"
            class="flex items-center"
          >
            <span class="material-symbols-outlined">center_focus_strong</span>
          </router-link>
        </template></a-base-input
      >
      <a-base-input
        id="name"
        v-model="itemState.name"
        label="Наименование"
        placeholder="Наименование"
        type="text"
      />
      <a-base-input
        id="purchase-price"
        v-model="itemState.purchasePrice"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="₸"
      />
      <a-base-input
        id="selling-price"
        v-model="itemState.sellingPrice"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="₸"
      />
      <a-base-input
        id="filters"
        v-model="filters"
        label="Категории"
        placeholder="Выбрать"
        type="text"
        @click="$router.push(filterPathMulti)"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref, watch } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import { useFilters } from "@/composables/filters.js"
import { useScan } from "@/composables/useScan"
import AModal from "@/components/ui/AModal.vue"

const router = useRouter()
const itemState = ref({})
const { filters, filterPathMulti } = useFilters()
const { scannedCode } = useScan()

const addStoreItem = async () => {
  try {
    itemState.value.filters = filters.value
    const storeItem = await StoreService.addStoreItem(itemState.value)
    if (storeItem) {
      await router.push("/store/items/" + storeItem.id)
    }
  } catch (error) {
    console.error(error)
  }
}

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    itemState.value.code = newScannedCode
  }
})
</script>

<style lang="scss" scoped></style>
