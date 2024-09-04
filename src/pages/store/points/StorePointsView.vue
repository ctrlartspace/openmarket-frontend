<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/points/add">Добавить </a-link>
    </template>
    <data-table
      :table-data="storePoints"
      :table-fields="tableFields"
      @on-item-click="loginToStorePoint"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useRouter } from "vue-router"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import ALink from "@/components/ui/ALink.vue"

const store = useUserStore()
const router = useRouter()

const storePoints = ref([])

const getStorePoints = async () => {
  try {
    storePoints.value = await StoreService.getStorePoints()
  } catch (error) {
    console.log(error)
  }
}

const loginToStorePoint = async (item) => {
  try {
    await store.loginToStorePoint(item.id)
    router.push("/point")
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getStorePoints()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
])
</script>

<style lang="scss" scoped></style>
