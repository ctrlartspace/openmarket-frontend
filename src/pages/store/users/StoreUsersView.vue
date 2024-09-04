<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/users/add">Добавить </a-link>
    </template>
    <data-table :table-data="storeUsers" :table-fields="tableFields">
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import ALink from "@/components/ui/ALink.vue"

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
