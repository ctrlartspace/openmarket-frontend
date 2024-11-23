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
    <template v-if="isError" #error>{{ errorMessage }} </template>
    <div class="flex flex-col gap-2">
      <router-link
        v-if="storeItem"
        :to="{ path: '/store/items/' + storeItem.id }"
        class="rounded-xl border border-neutral-200 bg-white px-4 py-2 md:hover:bg-gray-50"
      >
        <h1 class="font-medium text-blue-600">
          {{ storeItem.name }}
        </h1>
        <p class="text-sm text-neutral-400">
          Код: {{ storeItem.code }}<br />
          Покупка: {{ storeItem.purchasePrice }} ₸ Продажа:
          {{ storeItem.sellingPrice }} ₸
        </p>
      </router-link>
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
              class="material-symbols-rounded cursor-pointer"
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
            <span class="material-symbols-rounded">center_focus_strong</span>
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
import { watchDebounced } from "@vueuse/core"

const router = useRouter()
const itemState = ref({})
const { filters, filterPathMulti } = useFilters()
const { scannedCode } = useScan()
const {
  validationErrors,
  sendRequest: addStoreItem,
  isError,
  errorMessage,
} = useApiRequest()
const codeIsGenerated = ref(false)
const { serverData: storeItem, sendRequest: checkStoreItem } = useApiRequest()

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

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    itemState.value.code = newScannedCode
  }
})

watchDebounced(
  [() => itemState.value.name, () => itemState.value.sellingPrice],
  async () => {
    if (codeIsGenerated.value) {
      generateCode()
      const storeItem = await checkStoreItem(
        "get",
        "/store/items/" + itemState.value.code + "?searchBy=code",
      )
    }
  },
  { debounce: 1200, deep: true },
)

watchDebounced(
  () => itemState.value.code,
  async () => {
    if (!itemState.value.code) {
      storeItem.value = null
      return
    }
    if (!codeIsGenerated.value) {
      const storeItem = await checkStoreItem(
        "get",
        "/store/items/" + itemState.value.code,
        { searchBy: "code" },
      )
    }
  },
  { debounce: 1200, deep: true },
)
</script>

<style lang="scss" scoped></style>
