<template>
  <a-page title="Импорт товаров">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="uploadProducts"
        title="Загрузить товары?"
      >
        <a-button :disabled="hasDublicates" primary v-bind="props">
          Готово
        </a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
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
    <template v-if="isHeadersNotValid" #error>
      Проверьте названия столбцов
    </template>
    <div class="mb-4 flex">
      <FileUpload
        v-if="!selectedFile"
        auto
        choose-label="Выбрать файл"
        custom-upload
        mode="basic"
        severity="secondary"
        @select="handleFileUpload"
      >
      </FileUpload>

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
      <Message class="mb-2" severity="warn">
        <p>Одинаковые штрихкоды: {{ duplicateProducts.length }}</p>
        <p>Удалите лишние товары</p>
      </Message>

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
            class="text-gray-400"
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

const router = useRouter()
const selectedFile = ref(null)
const selectedItems = ref([])
const selectedDublicateItems = ref([])
const products = ref([])
const duplicateProducts = ref([])
const requiredHeaders = [
  "Штрихкод",
  "Наименование",
  "Цена закупки",
  "Цена продажи",
  "Количество",
]

const { sendRequest, isError, errorMessage } = useApiRequest()
const isHeadersNotValid = ref(false)

const uploadProducts = async () => {
  console.log("upload", duplicateProducts.value)

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
    isHeadersNotValid.value = true
    return
  }
  isHeadersNotValid.value = false

  const headerIndexes = requiredHeaders.reduce((acc, header) => {
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
}

const validateHeaders = (headers) => {
  return requiredHeaders.every((header) => headers.includes(header))
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

  return duplicates
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

const clearFile = () => {
  selectedFile.value = null
  products.value = []
  duplicateProducts.value = []
}
</script>

<style lang="scss" scoped></style>
