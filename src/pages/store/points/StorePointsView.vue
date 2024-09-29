<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/points/add">Добавить</a-link>
    </template>
    <template #floating>
      <a-link-floating primary to="/store/points/add">add</a-link-floating>
    </template>
    <data-table
      :selectable="false"
      :table-data="storePoints"
      :table-fields="tableFields"
      @on-item-click="loginToStorePoint"
    >
      <template #option>
        <a-button accent>Открыть</a-button>
      </template>
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
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButton from "@/components/ui/AButton.vue"

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
  {
    name: "option",
  },
])
</script>

<style lang="scss" scoped></style>
