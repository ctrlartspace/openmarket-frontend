<template>
  <a-page title="Новый товар">
    <template #header>
      <a-modal
        #="{ props }"
        title="Создать товар?"
        :async-operation="onAddStoreItemClick"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Создать товар?"
        :async-operation="onAddStoreItemClick"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        id="article"
        v-model="itemState.code"
        label="Код товара"
        placeholder="Код товара"
        type="text"
        :is-error="validationErrors.code"
        :disabled="codeIsGenerated"
      >
        <template #action>
          <label
            class="flex items-center"
            for="generateCodeCheckbox"
            @click="generateCode"
          >
            <span
              class="material-symbols-outlined cursor-pointer"
              :class="codeIsGenerated ? 'text-blue-600' : 'text-black'"
              >bolt</span
            >
          </label>
          <input
            class="hidden"
            v-model="codeIsGenerated"
            id="generateCodeCheckbox"
            type="checkbox"
          />
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
        :is-error="validationErrors.name"
      />
      <a-base-input
        id="purchase-price"
        v-model="itemState.purchasePrice"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="₸"
        :is-error="validationErrors.purchasePrice"
      />
      <a-base-input
        id="selling-price"
        v-model="itemState.sellingPrice"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="₸"
        :is-error="validationErrors.sellingPrice"
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
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AModal from "@/components/ui/AModal.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import { computed, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import { useScan } from "@/composables/useScan"
import { useApiRequest } from "@/composables/useApiRequest"
import { generateEAN13 } from "@/utils/barcodeGenerator"

const router = useRouter()
const itemState = ref({})
const { filters, filterPathMulti } = useFilters()
const { scannedCode } = useScan()
const { validationErrors, sendRequest: addStoreItem } = useApiRequest()
const codeIsGenerated = ref(false)

const onAddStoreItemClick = async () => {
  itemState.value.filters = filters.value
  const response = await addStoreItem("post", "/store/items", itemState.value)
  if (response) {
    await router.push("/store/items/" + response.data.data.id)
  }
}

const generateCode = () => {
  itemState.value.code = generateEAN13(
    itemState.value.name,
    itemState.value.sellingPrice,
    itemState.value.filters,
  )
}
watch(
  itemState,
  () => {
    if (codeIsGenerated.value) {
      generateCode()
    }
  },
  { deep: true },
)

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    itemState.value.code = newScannedCode
  }
})
</script>

<style lang="scss" scoped></style>
