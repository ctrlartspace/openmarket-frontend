<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/points/add">Добавить</a-link>
    </template>
    <template #floating>
      <a-link-floating primary to="/store/points/add">add</a-link-floating>
    </template>
    <a-list
      v-if="storePoints"
      :items="storePoints"
      title-field="name"
      @on-item-click="loginToStorePoint"
      ><template #action>
        <a-button primary>Открыть</a-button>
      </template></a-list
    >
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useRouter } from "vue-router"
import StoreService from "@/services/StoreService"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButton from "@/components/ui/AButton.vue"
import AList from "@/components/ui/AList.vue"

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
</script>

<style lang="scss" scoped></style>
