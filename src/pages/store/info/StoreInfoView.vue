<template>
  <a-page :loading="isStorePointsLoading" no-padding>
    <div
      v-if="storeInfo"
      class="min-h-32 flex flex-col bg-gradient-to-b from-black to-black/80 px-8 py-6 pb-10 md:border-b md:border-neutral-200 md:from-white/50 md:to-white/50"
    >
      <span
        v-if="isStoreInfoLoading"
        class="material-symbols-outlined animate-spin text-3xl font-semibold text-white"
        >progress_activity</span
      >
      <div v-else>
        <h1 class="text-2xl text-white md:text-black">
          {{ storeInfo.fullName }}
        </h1>
        <p class="text-lg text-white/80 md:text-base md:text-black/80">
          {{ storeInfo.address }}
        </p>
      </div>
    </div>
    <div v-if="storePoints" class="p-4">
      <a-list
        :items="storePoints"
        title-field="name"
        @on-item-click="loginToStorePoint"
        class="-mt-10"
      >
        <template #title="{ item }"> {{ item.name }} </template>
        <template #action="{ item }">
          <span
            class="whitespace-nowrap rounded-xl bg-green-50 px-4 text-lg font-medium text-green-500 md:text-base"
            >{{ item.totalRevenue }} <span class="font-semibold">₸</span>
          </span>
        </template>
        <template #last>
          <router-link
            to="/store/points/add"
            class="flex items-center justify-center gap-2 text-lg text-blue-600 md:text-base"
          >
            <span class="material-symbols-outlined">add</span>
            Новая точка
          </router-link>
        </template>
      </a-list>
    </div>
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
