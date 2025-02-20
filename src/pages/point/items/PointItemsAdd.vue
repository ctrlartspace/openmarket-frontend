<template>
  <a-page title="Новый товар">
    <template #header>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        @click="$router.back()"
      >
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </button>
      <a-modal
        #="{ props }"
        :async-operation="onAddStoreItemClick"
        title="Создать товар?"
      >
        <button
          class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-blue-500"
          v-bind="props"
        >
          <span class="material-symbols-rounded">save</span>
          <span class="font-medium"> Сохранить</span>
        </button>
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
        v-if="existPointItem"
        :to="{ path: '/point/items/' + existPointItem.id }"
        class="rounded-xl border border-gray-100 bg-white px-4 py-3 md:hover:bg-gray-50"
      >
        <h1 class="font-medium text-blue-600">
          {{ existPointItem.name }}
        </h1>
        <p class="text-sm text-gray-400">
          Код: {{ existPointItem.code }}<br />
          Покупка: {{ existPointItem.purchasePrice }} ₸ Продажа:
          {{ existPointItem.sellingPrice }} ₸
        </p>
      </router-link>

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Код товара </label>
        <InputGroup>
          <InputText
            v-model="pointItem.code"
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
          v-model="pointItem.name"
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
            v-model="pointItem.purchasePrice"
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
            v-model="pointItem.sellingPrice"
            :invalid="validationErrors.sellingPrice"
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
import AModal from "@/components/ui/AModal.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useScan } from "@/composables/useScan"
import { useApiRequest } from "@/composables/useApiRequest"
import { generateEAN13 } from "@/utils/barcodeGenerator"
import { watchDebounced } from "@vueuse/core"

const router = useRouter()
const pointItem = ref({})
const { scannedCode } = useScan()
const {
  validationErrors,
  sendRequest: addStoreItem,
  isError,
  errorMessage,
} = useApiRequest()
const codeIsGenerated = ref(false)
const { serverData: existPointItem, sendRequest: checkStoreItem } =
  useApiRequest()

const onAddStoreItemClick = async () => {
  const response = await addStoreItem("post", "/point/items", pointItem.value)
  if (response) {
    await router.push("/point/items/" + response.data.data.id)
  }
}

const generateCode = () => {
  pointItem.value.code = generateEAN13(
    pointItem.value.name,
    pointItem.value.sellingPrice,
  )
}

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    pointItem.value.code = newScannedCode
  }
})

watchDebounced(
  [() => pointItem.value.name, () => pointItem.value.sellingPrice],
  async () => {
    if (codeIsGenerated.value) {
      generateCode()
      await checkStoreItem(
        "get",
        "/point/items/" + pointItem.value.code + "?searchBy=code",
      )
    }
  },
  { debounce: 1200, deep: true },
)

watchDebounced(
  () => pointItem.value.code,
  async () => {
    if (!pointItem.value.code) {
      existPointItem.value = null
      return
    }
    if (!codeIsGenerated.value) {
      await checkStoreItem("get", "/point/items/" + pointItem.value.code, {
        searchBy: "code",
      })
    }
  },
  { debounce: 1200, deep: true },
)
</script>

<style lang="scss" scoped></style>
