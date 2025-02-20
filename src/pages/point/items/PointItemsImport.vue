<template>
  <a-page title="Импорт товаров">
    <template #header>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        @click="$router.back()"
      >
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </button>
      <a-modal
        v-if="selectedFile"
        #="{ props }"
        :async-operation="uploadProducts"
        title="Загрузить товары?"
      >
        <button
          v-if="!hasDublicates"
          class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-blue-600"
          v-bind="props"
        >
          <span class="material-symbols-rounded">upload</span>
          <span class="font-medium"> Загрузить</span>
        </button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        v-if="selectedFile"
        #="{ props }"
        :async-operation="uploadProducts"
        title="Загрузить товары?"
      >
        <a-button-floating-text
          :disabled="hasDublicates"
          primary
          v-bind="props"
        >
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <template v-if="isError" #error>
      {{ errorMessage }}
    </template>
    <div class="mb-4 flex">
      <div
        v-if="!selectedFile"
        class="flex w-full flex-col gap-2 rounded-xl bg-white p-4"
      >
        <message severity="success">
          <p class="mb-2">
            Для импорта товаров загрузите Excel-файл, содержащий следующие
            столбцы:
          </p>
          <ul class="mb-2 list-disc pl-4 font-normal">
            <li>Штрихкод</li>
            <li>Наименование</li>
            <li>Цена закупки</li>
            <li>Цена продажи</li>
            <li>Количество</li>
          </ul>
          <p>
            Файл может содержать и другие столбцы, но эти должны быть
            обязательно.
          </p>
        </message>
        <FileUpload
          auto
          choose-label="Выбрать файл"
          class="w-full"
          custom-upload
          mode="basic"
          severity="secondary"
          @select="handleFileUpload"
        >
        </FileUpload>
      </div>

      <InputGroup v-else>
        <InputText v-model="selectedFile.name" readonly type="text" />
        <InputGroupAddon>
          <Button severity="secondary" variant="text" @click="clearFile">
            <template #icon>
              <span class="material-symbols-rounded text-black">close</span>
            </template>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>

    <div v-if="hasDublicates" class="mb-2">
      <Message class="mb-2" severity="error">
        <template #container>
          <div class="p-4">
            <p>Одинаковые штрихкоды: {{ duplicateProducts.length }}</p>
            <p>Удалите лишние товары</p>

            <a-modal
              #="{ props }"
              :async-operation="removeDuplicateProducts"
              title="Удалить дубликаты?"
            >
              <button
                v-press
                class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white shadow-sm"
                v-bind="props"
              >
                <span> Удалить автоматически </span>
              </button>
            </a-modal>
          </div>
        </template>
      </Message>

      <h1 class="mb-2 px-4 text-gray-300">Выберите лишние товары</h1>
      <a-list
        v-model="selectedDublicateItems"
        :items="duplicateProducts"
        description-field="purchasePrice"
        selectable
        title-field="name"
      >
        <template #selectAction>
          <div class="px-4">
            <a-modal
              #="{ props }"
              :async-operation="removeSelectedItems"
              title="Удалить товары из списка?"
            >
              <a-button danger v-bind="props">Удалить из списка</a-button>
            </a-modal>
          </div>
        </template>
        <template #description="{ item }">
          <span class="font-normal">
            {{ formatMoney(item.purchasePrice) }}
            <span>₸</span>
          </span>
          <span> — </span>
          <span class="font-normal">
            {{ formatMoney(item.sellingPrice) }}
            <span>₸</span>
          </span>
        </template>
        <template #sub="{ item }"
          ><span
            :class="{ 'text-green-500': !item.hasCode }"
            class="text-red-400"
            >{{ item.code || "Нет штрихкода" }}</span
          ><span v-if="!item.hasCode"> (сгенерирован)</span></template
        >
      </a-list>
    </div>
    <h1 v-if="selectedFile" class="mb-2 px-4 text-gray-300">
      Количество: {{ products.length }}
    </h1>

    <a-list
      v-model="selectedItems"
      :items="products"
      description-field="purchasePrice"
      selectable
      title-field="name"
    >
      <template #selectAction>
        <div class="px-4">
          <a-modal
            #="{ props }"
            :async-operation="removeSelectedItems"
            title="Удалить товары из списка?"
          >
            <a-button danger v-bind="props">Удалить из списка</a-button>
          </a-modal>
        </div>
      </template>
      <template #description="{ item }">
        <span class="font-normal">
          {{ formatMoney(item.purchasePrice) }}
          <span>₸</span>
        </span>
        <span> — </span>
        <span class="font-normal">
          {{ formatMoney(item.sellingPrice) }}
          <span>₸</span>
        </span>
      </template>

      <template #sub="{ item }">
        <div class="flex justify-between text-gray-300">
          <span
            :class="{ 'text-green-500': !item.hasCode }"
            class="text-gray-400"
            >{{ item.code || "Нет штрихкода" }}</span
          >

          <span>{{ item.count }} шт.</span>
        </div>
      </template>
    </a-list>
  </a-page>
</template>

<script setup>
import AModal from "@/components/ui/AModal.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { computed, ref } from "vue"
import * as XLSX from "xlsx"
import AList from "@/components/ui/AList.vue"
import { formatMoney } from "@/utils/format-money.js"
import { generateEAN13 } from "@/utils/barcodeGenerator.js"
import { useApiRequest } from "@/composables/useApiRequest.js"
import { useRouter } from "vue-router"
import { useModalStore } from "@/stores/modal.store.js"

const router = useRouter()
const selectedFile = ref(null)
const selectedItems = ref([])
const selectedDublicateItems = ref([])
const products = ref([])
const duplicateProducts = ref([])
const requiredHeaders = ref([
  "Штрихкод",
  "Наименование",
  "Цена закупки",
  "Цена продажи",
  "Количество",
])

const notValideHeaders = ref([])

const { sendRequest, isError, errorMessage } = useApiRequest()
const modal = useModalStore()

const uploadProducts = async () => {
  if (duplicateProducts.value.length === 0) {
    await sendRequest("post", "/point/items/many", products.value)
    clearFile()
    await router.push("/point/items")
  }
}

const handleFileUpload = (event) => {
  selectedFile.value = event.files[0]
  if (!selectedFile.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: "array" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

    validateAndProcessExcelData(jsonData)
  }
  reader.readAsArrayBuffer(selectedFile.value)
}

const validateAndProcessExcelData = (data) => {
  if (data.length < 2) return
  const headers = data[0]

  if (!validateHeaders(headers)) {
    modal.show(
      "Неверный формат",
      "Неправильно заданы названия столбцов: " +
        notValideHeaders.value.join(", "),
    )
    clearFile()
    return
  }

  const headerIndexes = requiredHeaders.value.reduce((acc, header) => {
    acc[header] = headers.indexOf(header)
    return acc
  }, {})

  products.value = data.slice(1).map((row, i) => {
    const name = row[headerIndexes["Наименование"]] || "Безымянный товар"
    const purchasePrice = parseFloat(row[headerIndexes["Цена закупки"]]) || 0
    const sellingPrice = parseFloat(row[headerIndexes["Цена продажи"]]) || 0
    const code =
      row[headerIndexes["Штрихкод"]] || generateEAN13(name, purchasePrice, i)
    const hasCode = !!row[headerIndexes["Штрихкод"]]
    const count = parseInt(row[headerIndexes["Количество"]]) || 0
    return {
      id: i,
      code,
      name,
      purchasePrice,
      sellingPrice,
      count,
      hasCode,
    }
  })

  duplicateProducts.value = findDuplicates(products.value)
  console.log(duplicateProducts.value)
}

const validateHeaders = (headers) => {
  return requiredHeaders.value.every((header) => {
    const isValid = headers.includes(String(header).trim())
    notValideHeaders.value.push(header)
    return isValid
  })
}

function findDuplicates(arr) {
  const codeCount = {}
  const duplicates = []

  arr.forEach((item) => {
    codeCount[item.code] = (codeCount[item.code] || 0) + 1
  })

  arr.forEach((item) => {
    if (codeCount[item.code] > 1) {
      duplicates.push(item)
    }
  })

  return duplicates.sort((a, b) => String(a.code).localeCompare(String(b.code)))
}

const hasDublicates = computed(() => duplicateProducts.value.length > 0)

const removeSelectedItems = () => {
  const selectedIds = new Set([
    ...selectedItems.value,
    ...selectedDublicateItems.value,
  ])

  products.value = products.value.filter(
    (product) => !selectedIds.has(product.id),
  )
  duplicateProducts.value = findDuplicates(products.value)

  selectedItems.value = []
  selectedDublicateItems.value = []
}

const removeDuplicateProducts = () => {
  const uniqueProducts = new Map()

  products.value.forEach((product) => {
    if (!uniqueProducts.has(product.code)) {
      uniqueProducts.set(product.code, product)
    }
  })

  products.value = Array.from(uniqueProducts.values())
  duplicateProducts.value = [] // Очищаем список дубликатов
}

const clearFile = () => {
  selectedFile.value = null
  products.value = []
  duplicateProducts.value = []
  notValideHeaders.value = []
}
</script>

<style lang="scss" scoped></style>
