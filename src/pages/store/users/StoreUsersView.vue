<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/users/add">Добавить</a-link>
    </template>
    <data-table
      :table-data="storeUsers"
      :table-fields="tableFields"
      @on-item-click="onItemClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import ALink from "@/components/ui/ALink.vue"
import { useSelect } from "@/composables/useSelect2.js"

const storeUsers = ref([])
const { isSelectableMode, applySelect } = useSelect()

const getStoreUsers = async () => {
  try {
    storeUsers.value = await StoreService.getStoreUsers()
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item)
  } else {
    // router.push(`/store/items/${item.id}`)
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
