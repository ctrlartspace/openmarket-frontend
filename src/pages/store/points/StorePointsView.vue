<template>
  <a-page :loading="isLoading">
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
        <span class="material-symbols-outlined flex items-center font-medium"
          >chevron_right</span
        >
      </template></a-list
    >
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useRouter } from "vue-router"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButton from "@/components/ui/AButton.vue"
import AList from "@/components/ui/AList.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const {
  serverData: storePoints,
  sendRequest: fetchStorePoints,
  isLoading,
} = useApiRequest()

const store = useUserStore()
const router = useRouter()

const loginToStorePoint = async (item) => {
  try {
    await store.loginToStorePoint(item.id)
    router.push("/point")
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchStorePoints("get", "/store/points")
})
</script>

<style lang="scss" scoped></style>
