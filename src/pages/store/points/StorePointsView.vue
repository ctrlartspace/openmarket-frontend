<template>
  <a-page>
    <template #header>
      <router-link
        to="/store/points/add"
        class="text-base font-medium text-blue-600"
        >Добавить</router-link
      >
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
import { ref, onMounted } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useRouter } from "vue-router"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"

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
