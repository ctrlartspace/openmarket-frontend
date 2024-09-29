<template>
  <a-page>
    <template #header>
      <a-link primary to="/point/users/add">Добавить </a-link>
    </template>
    <template #floating>
      <a-link-floating primary to="/point/users/add">add </a-link-floating>
    </template>
    <data-table :table-data="pointUsers" :table-fields="tableFields">
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import PointUserService from "@/services/point/users.js"
import DataTable from "@/components/ui/DataTable.vue"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"

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
