<template>
  <a-page>
    <template #header>
      <router-link
        to="/store/users/add"
        class="text-base font-medium text-blue-600"
        >Добавить</router-link
      >
    </template>
    <data-table :table-data="storeUsers" :table-fields="tableFields">
    </data-table>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"

const storeUsers = ref([])

const getStoreUsers = async () => {
  try {
    storeUsers.value = await StoreService.getStoreUsers()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getStoreUsers()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
])
</script>

<style lang="scss" scoped></style>
