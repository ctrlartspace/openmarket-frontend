<template>
  <a-page title="Новый товар">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="onAddStoreItemClick"
        title="Создать товар?"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="onAddStoreItemClick"
        title="Создать товар?"
      >
        <a-button-floating-text primary v-bind="props">
          Сохранить
        </a-button-floating-text>
      </a-modal>
    </template>
    <template v-if="isError" #error>{{ errorMessage }}</template>
    <div class="flex flex-col gap-2">
      <router-link
        v-if="storeItem"
        :to="{ path: '/store/items/' + storeItem.id }"
        class="rounded-xl border border-gray-100 bg-white px-4 py-3 md:hover:bg-gray-50"
      >
        <h1 class="font-medium text-blue-600">
          {{ storeItem.name }}
        </h1>
        <p class="text-sm text-gray-400">
          Код: {{ storeItem.code }}<br />
          Покупка: {{ storeItem.purchasePrice }} ₸ Продажа:
          {{ storeItem.sellingPrice }} ₸
        </p>
      </router-link>

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Код товара </label>
        <InputGroup>
          <InputText
            v-model="itemState.code"
            :invalid="validationErrors.code"
            placeholder="Код товара"
            type="text"
          />
          <InputGroupAddon>
            <Button severity="secondary" variant="text" @click="generateCode">
              <template #icon>
                <label
                  class="flex items-center"
                  for="generateCodeCheckbox"
                  @click="generateCode"
                >
                  <span
                    :class="codeIsGenerated ? 'text-blue-600' : 'text-black'"
                    class="material-symbols-rounded cursor-pointer"
                    >bolt</span
                  >
                </label>
                <input
                  id="generateCodeCheckbox"
                  v-model="codeIsGenerated"
                  class="hidden"
                  type="checkbox"
                />
              </template>
            </Button>
            <Button
              :to="{
                path: '/scan2',
                query: { scannableMode: true },
              }"
              as="router-link"
              severity="secondary"
              variant="text"
            >
              <template #icon>
                <span class="material-symbols-rounded text-black"
                  >center_focus_strong</span
                >
              </template>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Наименование</label>
        <InputText
          v-model="itemState.name"
          :invalid="validationErrors.name"
          fluid
          placeholder="Наименование"
          type="text"
        />
      </div>

      <div class="flex gap-2">
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Покупка </label>
          <InputNumber
            v-model="itemState.purchasePrice"
            :invalid="validationErrors.purchasePrice"
            fluid
            locale="ru-RU"
            placeholder="Цена покупки"
            suffix=" ₸"
          />
        </div>
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Продажа </label>
          <InputNumber
            v-model="itemState.sellingPrice"
            :invalid="validationErrors.sellingPrice"
            fluid
            locale="ru-RU"
            placeholder="Цена продажи"
            suffix=" ₸"
          />
        </div>
      </div>
      <!--      <a-base-input-->
      <!--        id="filters"-->
      <!--        v-model="filters"-->
      <!--        label="Категории"-->
      <!--        placeholder="Выбрать"-->
      <!--        type="text"-->
      <!--        @click="$router.push(filterPathMulti)"-->
      <!--      />-->
    </div>
  </a-page>
</template>

<script setup>
import AModal from "@/components/ui/AModal.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { ref, watch } from "vue"
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
