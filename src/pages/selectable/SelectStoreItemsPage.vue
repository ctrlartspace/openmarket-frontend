<template>
  <a-page title="Выберите товар...">
    <template #header> </template>
    <data-table
      :table-data="storeItems"
      :table-fields="tableFields"
      @on-item-click="onApplyClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStoreItem } from "@/composables/storeItem.js"
import DataTable from "@/components/ui/DataTable.vue"
import StoreService from "@/services/StoreService.js"
import { useRouteStore } from "@/stores/route.store"

const routeStore = useRouteStore()
const router = useRouter()
const storeItems = ref([])
const { storeItem } = useStoreItem()

const onApplyClick = (item) => {
  storeItem.value = item.id
  try {
    const previousRoute = routeStore.previousRoute
    router.push({
      name: previousRoute.name,
      params: previousRoute.params,
      query: { ...previousRoute.query, storeItem: storeItem.value },
      replace: true,
    })
  } catch (error) {
    console.log(error)
  }
}
const getStoreItems = async () => {
  try {
    storeItems.value = await StoreService.getStoreItems()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  getStoreItems()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
  {
    name: "purchasePrice",
    className: "whitespace-nowrap ",
    postfix: " KZT",
  },
])
</script>

<style lang="scss" scoped></style>
