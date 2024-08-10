<template>
  <a-page>
    <div v-if="storeData">
      <page-header title="Сотрудники"></page-header>
      <page-content>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="user in storeData.users"
            class="w-min font-medium px-4 py-2 bg-white border text-lg md:text-base rounded-full truncate hover:brightness-95 active:brightness-95"
            :key="user.id"
          >
            {{ user.name }}
          </button>
          <button
            class="flex items-center gap-2 text-gray-400 w-min font-medium px-4 py-2 border text-lg md:text-base rounded-full truncate hover:brightness-95 active:brightness-95"
            @click="showDialog = true"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </button>
          <app-dialog
            v-if="showDialog"
            title="Новая точка"
            @close="showDialog = false"
          >
            <v-form @submit.prevent="addStorePoint">
              <div class="p-4 border-b border-gray-200">
                <a-base-input
                  v-model="newStorePointName"
                  id="selling-price"
                  type="text"
                  placeholder="Название"
                />
              </div>
              <div class="p-4">
                <button
                  type="submit"
                  class="block w-full px-4 py-2 bg-blue-600 text-white rounded-xl md:rounded hover:brightness-90 active:brightness-90"
                >
                  <span class="text-lg md:text-base font-medium">Добавить</span>
                </button>
              </div>
            </v-form>
          </app-dialog>
        </div>
      </page-content>
      <page-header title="Точки продаж"></page-header>
      <page-content>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="storePoint in storeData.storePoints"
            class="w-min font-medium px-4 py-2 bg-white border text-lg md:text-base rounded-full truncate hover:brightness-95 active:brightness-95"
            :key="storePoint.id"
            @click="loginToStorePoint(storePoint.id)"
          >
            {{ storePoint.name }}
          </button>
          <button
            class="flex items-center gap-2 text-gray-400 w-min font-medium px-4 py-2 border text-lg md:text-base rounded-full truncate hover:brightness-95 active:brightness-95"
            @click="showDialog = true"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </button>
          <app-dialog
            v-if="showDialog"
            title="Новая точка"
            @close="showDialog = false"
          >
            <v-form @submit.prevent="addStorePoint">
              <div class="p-4 border-b border-gray-200">
                <a-base-input
                  v-model="newStorePointName"
                  id="selling-price"
                  type="text"
                  placeholder="Название"
                />
              </div>
              <div class="p-4">
                <button
                  type="submit"
                  class="block w-full px-4 py-2 bg-blue-600 text-white rounded-xl md:rounded hover:brightness-90 active:brightness-90"
                >
                  <span class="text-lg md:text-base font-medium">Добавить</span>
                </button>
              </div>
            </v-form>
          </app-dialog>
        </div>
      </page-content>
      <page-header title="Товары в магазине" />
      <page-content>
        <search-field class="mb-2">
          <template #action>
            <button
              class="px-4 bg-blue-600 text-white hidden leading-8 md:flex items-center gap-2 rounded hover:brightness-95 active:brightness-95"
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
        <data-table
          :table-data="storeData.storeItems"
          :table-fields="tableFields"
        >
        </data-table>
      </page-content>

      <div class=""></div>
    </div>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user.store"
import StoreService from "@/services/StoreService.js"
import SearchField from "@/components/ui/SearchField.vue"
import DataTable from "@/components/ui/DataTable.vue"
import AppDialog from "@/components/AppDialog.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"

const store = useUserStore()
const storeData = ref(null)
const router = useRouter()
const showDialog = ref(false)
const newStorePointName = ref(null)

const getStore = async () => {
  try {
    storeData.value = await StoreService.getStore()
  } catch (error) {
    console.error(error)
  }
}

const addStorePoint = async () => {
  try {
    const storePoint = await StoreService.addStorePoint({
      name: newStorePointName.value,
    })
    if (storePoint) {
      await getStore()
    }
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
  await getStore()
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
