<template>
  <a-page :loading="isStorePointsLoading">
    <div
      v-if="storeInfo"
      class="min-h-32 mb-2 flex flex-col rounded-xl bg-white p-4"
    >
      <span
        v-if="isStoreInfoLoading"
        class="material-symbols-rounded animate-spin text-xl font-semibold"
        >progress_activity</span
      >
      <div v-else>
        <h1 class="text-2xl">
          {{ storeInfo.fullName }}
        </h1>
        <p class="text-neutral-600">
          {{ storeInfo.address }}
        </p>
      </div>
    </div>
    <a-list
      v-if="storePoints"
      :items="storePoints"
      title-field="name"
      @on-item-click="loginToStorePoint"
    >
      <template #title="{ item }"> {{ item.name }} </template>
      <template #action="{ item }">
        <span class="whitespace-nowrap rounded-xl font-medium text-green-500"
          >{{ item.totalRevenue }} <span class="font-semibold">₸</span>
        </span>
      </template>
      <template #last>
        <router-link
          to="/store/info/new-point"
          class="flex items-center justify-center gap-2 text-blue-600"
        >
          <span class="material-symbols-rounded">add</span>
          Новая точка
        </router-link>
      </template>
    </a-list>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useRouter } from "vue-router"
import AList from "@/components/ui/AList.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const {
  serverData: storeInfo,
  sendRequest: fetchStoreInfo,
  isLoading: isStoreInfoLoading,
} = useApiRequest()

const {
  serverData: storePoints,
  sendRequest: fetchStorePoints,
  isLoading: isStorePointsLoading,
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
  await Promise.all([
    fetchStoreInfo("get", "/store"),
    fetchStorePoints("get", "/store/points"),
  ])
  // await fetchStoreInfo("get", "/store")
  // await fetchStorePoints("get", "/store/points")
})
</script>

<style lang="scss" scoped></style>
