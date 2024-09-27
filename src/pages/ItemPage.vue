<template>
  <div class="">
    <div
      class="grid grid-cols-10 rounded-xl border border-gray-200 bg-white md:rounded-lg"
    >
      <div
        v-if="item"
        class="col-span-10 flex flex-col gap-2 border-gray-200 p-4 md:col-span-4 md:border-b md:border-r"
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
        class="col-span-10 flex border-b border-gray-200 px-4 py-2 md:col-span-6"
      ></div>
      <div class="col-span-10 flex flex-col gap-4 px-4 py-2 md:flex-row">
        <button
          v-if="!isEditMode"
          class="hidden items-center gap-2 text-blue-600 hover:brightness-90 active:brightness-90 md:inline-flex"
          @click="isEditMode = true"
        >
          <span class="text-lg md:text-base">Редактировать</span>
        </button>
        <button
          v-if="isEditMode"
          class="hidden items-center gap-2 text-blue-600 hover:brightness-90 active:brightness-90 md:inline-flex"
          @click="saveItemData"
        >
          <span class="text-lg md:text-base">Сохранить</span>
        </button>
        <button
          class="inline-flex items-center gap-2 text-blue-600 hover:brightness-90 active:brightness-90"
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
                class="block w-full rounded-xl bg-blue-600 px-4 py-2 text-white hover:brightness-90 active:brightness-90 md:rounded-lg"
                type="submit"
              >
                <span class="text-lg font-medium md:text-base">Добавить</span>
              </button>
            </div>
          </v-form>
        </app-dialog>
      </div>
    </div>

    <div
      class="absolute bottom-12 left-0 right-0 z-50 px-4 py-2 mb-safe md:hidden"
    >
      <button
        v-if="!isEditMode"
        class="flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-xl bg-blue-600 px-4 py-2 text-lg text-white shadow-xl hover:brightness-50 active:brightness-90"
        @click="isEditMode = true"
      >
        <span>Редактировать</span>
      </button>
      <button
        v-else
        class="z-50 flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-xl bg-blue-600 px-4 py-2 text-lg text-white shadow-xl hover:brightness-50 active:brightness-90"
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
