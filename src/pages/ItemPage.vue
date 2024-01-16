<template>
  <div>
    <div class="grid grid-cols-10 bg-white rounded border border-gray-200">
      <div v-if="item" class="col-span-4 border-r border-b border-gray-200">
        <div class="px-4 py-2 border-b">
          <span class="text-lg font-semibold">Информация</span>
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
      <div class="col-span-6 px-4 py-2 flex border-b border-gray-200"></div>
      <div class="col-span-12 px-4 py-2 flex gap-4">
        <button
          v-if="!isEditMode"
          class="text-blue-600 inline-flex gap-2 items-center hover:brightness-90"
          @click="isEditMode = true"
        >
          <span class="text-lg">Редактировать</span>
        </button>
        <button
          v-if="isEditMode"
          class="text-blue-600 inline-flex gap-2 items-center hover:brightness-90"
          @click="saveItemData"
        >
          <span class="text-lg">Сохранить</span>
        </button>
        <button
          class="text-blue-600 inline-flex gap-2 items-center hover:brightness-90"
          @click="saveItemData"
        >
          <span class="text-lg">Добавить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputField from "@/components/ui/InputField.vue"
import SelectField from "@/components/ui/SelectField.vue"
import FilterTree from "@/components/FilterTree.vue"

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getItem, updateItem, addItem, getFilters } from "@/services/ItemSearch"

const route = useRoute()
const router = useRouter()

const item = ref({})
const isEditMode = ref(true)

const filterList = ref([])

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
