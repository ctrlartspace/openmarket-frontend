<template>
  <a-page>
    <page-header title="dsf" />
    <page-content>
      <!-- <template #action>
      <button class="font-medium text-blue-600">Сохранить</button>
      <button class="font-medium text-blue-600">Сохранить</button>
    </template> -->
      <div v-if="storePoint">
        <div class="flex gap-2 mb-2">
          <a-select v-model="selectedUserId" :items="storeUsers" />

          <button
            class="flex items-center gap-2 bg-blue-500 text-white w-min px-4 text-lg rounded-xl md:rounded md:text-base hover:brightness-95 active:brightness-95"
            :disabled="!selectedUserId"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </button>
        </div>
        <data-table
          v-model="selectedItems"
          :table-data="storePoint.users"
          :table-fields="tableFields"
          @on-item-click="onItemClick"
        >
        </data-table></div
    ></page-content>
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import ASelect from "@/components/ui/ASelect.vue"

const selectedUserId = ref(null)
const storeUsers = ref([])
const storePoint = ref(null)

onMounted(async () => {
  storePoint.value = await StoreService.getStorePoint()

  storeUsers.value = await StoreService.getStoreUsers()
})

const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
  {
    name: "role",
    className: "",
  },
])
</script>

<style lang="scss" scoped></style>
