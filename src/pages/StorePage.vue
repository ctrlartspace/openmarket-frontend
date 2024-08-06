<template>
  <div class="flex flex-col gap-6">
    <div class="">
      <h1 class="text-2xl mb-2 font-medium">Точки продаж</h1>
      <div class="flex gap-2">
        <button
          v-for="storePoint in storePoints"
          class="w-min font-medium px-4 py-2 bg-white border text-lg md:text-base rounded-xl md:rounded truncate hover:brightness-95 active:brightness-95"
          type="submit"
          :key="storePoint.id"
          @click="loginToStorePoint(storePoint.id)"
        >
          {{ storePoint.name }}
        </button>
      </div>
    </div>
    <div class="">
      <h1 class="text-2xl mb-2 font-medium">Товары в магазине</h1>
      <search-field class="mb-2">
        <template #action>
          <button
            class="hidden leading-8 md:flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="newItemClick"
          >
            <span class="hidden md:inline text-lg md:text-base">Новый</span>
            <span class="material-icons-outlined md:text-[28px]">add</span>
          </button>
        </template>

        <template #afterSelect>
          <button
            class="hidden leading-8 md:flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
            type="button"
            @click="newItemClick"
          >
            <span class="material-icons-outlined md:text-[28px]"
              >shopping_bag</span
            >
            <span class="hidden md:block text-lg md:text-base"
              >Показать в магазине</span
            >
          </button>
        </template>
      </search-field>
      <data-table :table-data="storeItems" :table-fields="tableFields">
      </data-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user.store"
import { getStorePoints, getItems } from "@/services/StoreService.js"
import SearchField from "@/components/ui/SearchField.vue"
import DataTable from "@/components/ui/DataTable.vue"

const store = useUserStore()
const router = useRouter()
const storePoints = ref(null)
const storeItems = ref([])

const fetchStorePoints = async () => {
  try {
    storePoints.value = await getStorePoints()
  } catch (error) {
    console.error(error)
  }
}

const fetchStoreItems = async () => {
  try {
    storeItems.value = await getItems()
  } catch (error) {
    console.error(error)
  }
}

const loginToStorePoint = async (id) => {
  try {
    const response = await store.loginToStorePoint(id)
    router.push("/")
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  await fetchStorePoints()
  await fetchStoreItems()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
  { name: "count", className: "whitespace-nowrap", postfix: " шт" },
  {
    name: "purchasePrice",
    className: "whitespace-nowrap ",
    postfix: " KZT",
  },
])
</script>

<style></style>
