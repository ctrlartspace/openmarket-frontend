<template>
  <div class="p-4 pb-16 md:p-2">
    <div
      class="grid grid-cols-10 bg-white rounded-xl md:rounded border border-gray-200"
    >
      <div
        v-if="item"
        class="col-span-10 md:col-span-4 border-r border-b border-gray-200"
      >
        <div class="px-4 py-2 border-b">
          <span class="text-lg md:text-base font-medium">Информация</span>
        </div>
        <input-field
          v-model="item.code"
          placeholder="Штрихкод"
          :disabled="!isEditMode"
        />

        <input-field
          v-model="item.name"
          placeholder="Наименование"
          :disabled="!isEditMode"
        />

        <input-field
          v-model="item.purchasePrice"
          placeholder="Цена покупки"
          :disabled="!isEditMode"
        />
        <input-field
          v-model="item.sellingPrice"
          placeholder="Цена продажи"
          :disabled="!isEditMode"
        />
        <select-field
          v-model="item.filters"
          :items="filterList"
          placeholder="Фильтры"
          item-value="id"
          item-title="name"
          :disabled="!isEditMode"
        >
          <filter-tree v-model="item.filters" :items="filterList" />
        </select-field>
      </div>
      <div
        class="col-span-10 md:col-span-6 px-4 py-2 flex border-b border-gray-200"
      ></div>
      <div class="col-span-10 px-4 py-2 flex flex-col md:flex-row gap-4">
        <button
          v-if="!isEditMode"
          class="hidden md:inline-flex text-blue-600 gap-2 items-center hover:brightness-90"
          @click="isEditMode = true"
        >
          <span class="text-lg md:text-base">Редактировать</span>
        </button>
        <button
          v-if="isEditMode"
          class="hidden md:inline-flex text-blue-600 gap-2 items-center hover:brightness-90"
          @click="saveItemData"
        >
          <span class="text-lg md:text-base">Сохранить</span>
        </button>
        <button
          class="text-blue-600 inline-flex gap-2 items-center hover:brightness-90"
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
            <div class="border rounded-xl md:rounded border-gray-200">
              <input-field
                v-model.number="newIncomeItemCount"
                placeholder="Количество"
              />
            </div>
            <button
              type="submit"
              class="block w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl md:rounded hover:brightness-90"
            >
              <span class="text-lg md:text-base font-medium">Добавить</span>
            </button>
          </v-form>
        </app-dialog>
      </div>
    </div>

    <div class="md:hidden absolute bottom-12 left-0 right-0 px-4 py-2 mb-safe">
      <button
        v-if="!isEditMode"
        class="w-full bg-blue-600 text-white flex justify-center items-center gap-4 text-lg px-4 py-2 rounded-xl hover:brightness-50 cursor-pointer select-none shadow-xl"
        @click="isEditMode = true"
      >
        <span>Редактировать</span>
      </button>
      <button
        v-else
        class="w-full bg-blue-600 text-white flex justify-center items-center gap-4 text-lg px-4 py-2 rounded-xl hover:brightness-50 cursor-pointer select-none shadow-xl"
        @click="saveItemData"
      >
        <span>Сохранить</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import InputField from "@/components/ui/InputField.vue"
import SelectField from "@/components/ui/SelectField.vue"
import FilterTree from "@/components/FilterTree.vue"
import AppDialog from "@/components/AppDialog.vue"

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
  getItem,
  updateItem,
  addItem,
  getFilters,
  makeIncome,
} from "@/services/ItemSearch"

const route = useRoute()
const router = useRouter()

const item = ref({})
const isEditMode = ref(true)

const filterList = ref([])
const showDialog = ref(false)
const newIncomeItemCount = ref(null)

const saveItemData = async () => {
  if (item.value.id) {
    const response = await updateItem(item.value)
    const { id } = response
    item.value = await getItem(id)
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

onMounted(async () => {
  filterList.value = await getFilters()

  const id = route.params.id
  if (id) {
    item.value = await getItem(id)
    if (item.value) {
      isEditMode.value = false
    }
  }
})
</script>
