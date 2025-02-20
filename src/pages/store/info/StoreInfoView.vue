<template>
  <a-page :loading="isStorePointsLoading" title="Информация">
    <template #header>
      <router-link
        :to="{
          path: '/store/info/new-point',
        }"
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-blue-600"
      >
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Новая точка</span>
      </router-link>
    </template>
    <template #floating>
      <a-link-floating-text primary to="/store/info/new-point"
        >Новая точка
      </a-link-floating-text>
    </template>
    <template v-if="isStorePointsError" #error>{{ errorMessage }}</template>
    <div
      v-if="storeInfo"
      class="min-h-32 mb-4 flex flex-col rounded-xl bg-white p-4"
    >
      <span
        v-if="isStoreInfoLoading"
        class="material-symbols-rounded animate-spin text-xl font-semibold"
        >progress_activity</span
      >
      <div v-else>
        <h1 class="">
          {{ storeInfo.fullName }}
        </h1>
        <p class="text-gray-400">
          {{ storeInfo.address }}
        </p>
      </div>
    </div>
    <h1 class="mb-2 px-4 text-gray-400">Выберите точку продаж</h1>
    <a-modal
      v-model="selectedPoint"
      :async-operation="loginToStorePoint"
      title="Открыть точку?"
    ></a-modal>
    <a-list
      v-if="storePoints"
      :items="storePoints"
      class="mb-4"
      title-field="name"
      @on-item-click="selectPoint"
    >
      <template #title="{ item }"
        ><span
          :class="{
            'text-blue-500': store.point && store.point.id === item.id,
          }"
          >{{ item.name }}</span
        >
      </template>
      <template #action="{ item }">
        <span
          :class="{
            'text-blue-500': store.point && store.point.id === item.id,
          }"
          class="whitespace-nowrap rounded-xl font-medium"
          >{{ formatMoney(item.totalRevenue) }}
          <span class="font-semibold">₸</span>
        </span>
      </template>
    </a-list>

    <a-list :items="menuItems" class="mb-4" title-field="title">
      <template #title="{ item }">
        <router-link :to="item.path" class="flex items-center gap-4">
          <span class="material-symbols-rounded">{{ item.icon }}</span>
          <span class="font-medium">
            {{ item.title }}
          </span>
          <span class="material-symbols-rounded ml-auto">chevron_right</span>
        </router-link>
      </template>
    </a-list>

    <a-modal
      #="{ props }"
      :async-operation="store.logOut"
      title="Выйти из приложения?"
    >
      <button
        class="flex w-full gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3 text-red-500"
        v-bind="props"
      >
        <span class="material-symbols-rounded">exit_to_app</span>
        <span class="font-medium"> Выход</span>
      </button>
    </a-modal>
  </a-page>
</template>

<script setup>
import ALinkFloatingText from "@/components/ui/ALinkFloatingText.vue"
import { computed, onMounted, ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useRouter } from "vue-router"
import AList from "@/components/ui/AList.vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatMoney } from "@/utils/format-money"
import AModal from "@/components/ui/AModal.vue"

const selectedPoint = ref(null)

const {
  serverData: storeInfo,
  sendRequest: fetchStoreInfo,
  isLoading: isStoreInfoLoading,
} = useApiRequest()

const {
  serverData: storePoints,
  sendRequest: fetchStorePoints,
  isLoading: isStorePointsLoading,
  isError: isStorePointsError,
  errorMessage: errorMessage,
} = useApiRequest()

const store = useUserStore()
const router = useRouter()

const loginToStorePoint = async () => {
  try {
    await store.loginToStorePoint(selectedPoint.value.id)
    await router.push("/point")
    selectPoint(null)
  } catch (error) {
    console.log(error)
  }
}

const selectPoint = (item) => {
  selectedPoint.value = item
}

const menuItems = computed(() =>
  [
    {
      title: "Сотрудники",
      icon: "group",
      path: "/store/users",
      permission: "view_users",
    },
  ].filter((item) => store.hasPermission(item.permission)),
)

onMounted(async () => {
  await Promise.all([
    fetchStoreInfo("get", "/store"),
    fetchStorePoints("get", "/store/points"),
  ])
})
</script>

<style lang="scss" scoped></style>
