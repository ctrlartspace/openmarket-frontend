<template>
  <a-page>
    <page-header title="dsf" />
    <page-content>
      <!-- <template #action>
      <button class="font-medium text-blue-600">Сохранить</button>
      <button class="font-medium text-blue-600">Сохранить</button>
    </template> -->
      <div v-if="point">
        <div class="flex gap-2 mb-2">
          <a-select v-model="selectedUserId" :items="storeUsers" />

          <button
            :disabled="!selectedUserId"
            class="flex items-center gap-2 bg-blue-500 text-white w-min px-4 text-lg rounded-xl md:rounded md:text-base hover:brightness-95 active:brightness-95"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </button>
        </div>
        <data-table
          v-model="selectedItems"
          :table-data="point.users"
          :table-fields="tableFields"
          @on-item-click="onItemClick"
        >
        </data-table>
      </div>
    </page-content>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import ASelect from "@/components/ui/ASelect.vue"

const selectedUserId = ref(null)
const storeUsers = ref([])
const point = ref(null)

onMounted(async () => {
  point.value = await StoreService.getStorePoint()
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
