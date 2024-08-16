<template>
  <a-page>
    <template #header>
      <router-link
        to="/point/users/add"
        class="text-base font-medium text-blue-600"
        >Добавить</router-link
      >
    </template>
    <data-table :table-data="pointUsers" :table-fields="tableFields">
    </data-table>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import PointUserService from "@/services/point/users.js"
import DataTable from "@/components/ui/DataTable.vue"

const pointUsers = ref([])

const getPointUsers = async () => {
  try {
    pointUsers.value = await PointUserService.getPointUsers()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getPointUsers()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
])
</script>

<style lang="scss" scoped></style>
