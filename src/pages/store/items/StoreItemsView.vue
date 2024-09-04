<template>
  <a-page :title="isSelectableMode ? 'Выбрать...' : ''">
    <template #header>
      <router-link
        v-if="!isSelectableMode"
        class="text-base font-medium text-blue-600"
        to="/store/items/add"
      >Добавить
      </router-link
      >
    </template>
    <data-table
      :table-data="storeItems"
      :table-fields="tableFields"
      @on-item-click="onItemClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import { useSelect } from "@/composables/useSelect.js"

const router = useRouter()
const storeItems = ref([])
const { isSelectableMode, applySelect } = useSelect()

const getStoreItems = async () => {
  try {
    storeItems.value = await StoreService.getStoreItems()
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item.id)
  } else {
    router.push(`/store/items/${item.id}`)
  }
}

onMounted(() => {
  getStoreItems()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full"
  },
  {
    name: "purchasePrice",
    className: "whitespace-nowrap ",
    postfix: " KZT"
  }
])
</script>

<style lang="scss" scoped></style>
