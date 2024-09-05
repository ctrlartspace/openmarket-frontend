<template>
  <div class="">
    <div
      class="grid grid-cols-10 bg-white rounded-xl md:rounded border border-gray-200"
    >
      <div
        v-if="item"
        class="p-4 flex flex-col gap-2 col-span-10 md:col-span-4 md:border-r md:border-b border-gray-200"
      >
        <a-select
          id="input-store-item"
          v-model="item.storeItemId"
          :disabled="!isEditMode"
          :items="storeItems"
          @change="onStoreItemChange"
        />
        <a-base-input
          id="article"
          v-model="item.code"
          :disabled="item.storeItemId"
          label="Код товара"
          placeholder="Код товара"
          type="text"
        />
        <a-base-input
          id="name"
          v-model="item.name"
          :disabled="item.storeItemId"
          label="Наименование"
          placeholder="Наименование"
          type="text"
        />
        <a-base-input
          id="purchase-price"
          v-model="item.purchasePrice"
          :disabled="!isEditMode"
          label="Цена покупки"
          placeholder="Цена покупки"
          type="text"
        />
        <a-base-input
          id="selling-price"
          v-model="item.sellingPrice"
          :disabled="!isEditMode"
          label="Цена продажи"
          placeholder="Цена продажи"
          type="text"
        />
        <a-select
          id="input-filters"
          v-model="item.filters"
          :disabled="!isEditMode"
          :items="filterList"
        >
          <filter-tree v-model="item.filters" :items="filterList" />
        </a-select>
      </div>
      <div
        class="col-span-10 md:col-span-6 px-4 py-2 flex border-b border-gray-200"
      ></div>
      <div class="col-span-10 px-4 py-2 flex flex-col md:flex-row gap-4">
        <button
          v-if="!isEditMode"
          class="hidden md:inline-flex text-blue-600 gap-2 items-center hover:brightness-90 active:brightness-90"
          @click="isEditMode = true"
        >
          <span class="text-lg md:text-base">Редактировать</span>
        </button>
        <button
          v-if="isEditMode"
          class="hidden md:inline-flex text-blue-600 gap-2 items-center hover:brightness-90 active:brightness-90"
          @click="saveItemData"
        >
          <span class="text-lg md:text-base">Сохранить</span>
        </button>
        <button
          class="text-blue-600 inline-flex gap-2 items-center hover:brightness-90 active:brightness-90"
          @click="showDialog = true"
        >
          <span class="text-lg md:text-base">Добавить</span>
        </button>
        <app-dialog
          v-if="showDialog"
          title="Добавить"
          @close="showDialog = false"
        >
          <v-form @submit.prevent="addIncome">
            <div class="border-b border-gray-200">
              <input-field
                v-model.number="newIncomeItemCount"
                placeholder="Количество"
              />
            </div>
            <div class="p-4">
              <button
                class="block w-full px-4 py-2 bg-blue-600 text-white rounded-xl md:rounded hover:brightness-90 active:brightness-90"
                type="submit"
              >
                <span class="text-lg md:text-base font-medium">Добавить</span>
              </button>
            </div>
          </v-form>
        </app-dialog>
      </div>
    </div>

    <div
      class="z-50 md:hidden absolute bottom-12 left-0 right-0 px-4 py-2 mb-safe"
    >
      <button
        v-if="!isEditMode"
        class="w-full bg-blue-600 text-white flex justify-center items-center gap-4 text-lg px-4 py-2 rounded-xl hover:brightness-50 active:brightness-90 cursor-pointer select-none shadow-xl"
        @click="isEditMode = true"
      >
        <span>Редактировать</span>
      </button>
      <button
        v-else
        class="z-50 w-full bg-blue-600 text-white flex justify-center items-center gap-4 text-lg px-4 py-2 rounded-xl hover:brightness-50 active:brightness-90 cursor-pointer select-none shadow-xl"
        @click="saveItemData"
      >
        <span>Сохранить</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import InputField from "@/components/ui/InputField.vue"
import ASelect from "@/components/ui/ASelect.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import FilterTree from "@/components/FilterTree.vue"
import AppDialog from "@/components/AppDialog.vue"

import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
  addItem,
  getFilters,
  getPointItem,
  makeIncome,
  updatePointItem,
} from "@/services/PointService"
import StoreService from "@/services/StoreService"

const route = useRoute()
const router = useRouter()

const storeItems = ref([])
const item = ref({})
const isEditMode = ref(true)

const filterList = ref([])
const showDialog = ref(false)
const newIncomeItemCount = ref(null)

const saveItemData = async () => {
  if (item.value.id) {
    const updatedItem = await updatePointItem(item.value.id, item.value)
    const { id } = updatedItem
    item.value = await getPointItem(id)
  } else {
    const response = await addItem(item.value)
    const { id } = response
    router.push(`/items/${id}`)
  }
  isEditMode.value = false
}

const addIncome = async () => {
  const incomeItem = {
    itemId: item.value.id,
    purchasePrice: item.value.purchasePrice,
    count: newIncomeItemCount.value,
  }
  const response = await makeIncome([incomeItem])
  console.log(response)
}

const onStoreItemChange = (selectedItem) => {
  try {
    if (selectedItem) {
      item.value.code = selectedItem.code
      item.value.name = selectedItem.name
      item.value.storeItemId = selectedItem.id
      item.value.purchasePrice = selectedItem.purchasePrice
      item.value.sellingPrice = selectedItem.sellingPrice
    } else {
      item.value = {}
    }
  } catch (error) {}
}

const fetchItem = async (id) => {
  try {
    const fetchedItem = await getPointItem(id)
    if (fetchedItem) {
      item.value = fetchedItem
      isEditMode.value = false
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  filterList.value = await getFilters()
  storeItems.value = await StoreService.getStoreItems()

  const id = route.params.id
  if (id) {
    await fetchItem(id)
  }
})
</script>
