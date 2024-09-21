<template>
  <a-page title="История">
    <template #header></template>
    <data-table
      :selectable="false"
      :table-data="cashRegisters"
      :table-fields="tableFields"
    >
      <template #id="{ item }">
        <span class="text-base font-medium">Касса #{{ item.id }}</span>
      </template>
      <template #isClosed="{ item }">
        <span
          v-if="item.isClosed"
          class="font-medium px-4 py-1 bg-neutral-50 text-neutral-500 rounded"
          >Закрыта</span
        >
        <span
          v-else
          class="font-medium px-4 py-1 bg-green-50 text-green-600 rounded"
          >Открыта</span
        >
      </template>
    </data-table>
  </a-page>
</template>

<script setup>
import { getCashRegisters } from "@/services/CashService.js"
import { onMounted, ref } from "vue"
import DataTable from "@/components/ui/DataTable.vue"

const cashRegisters = ref({})

const fetchCashRegisters = async () => {
  cashRegisters.value = await getCashRegisters()
}

onMounted(async () => {
  await fetchCashRegisters()
})

const tableFields = ref([
  {
    name: "id",
    className: "w-full",
  },
  // { name: "total", className: "whitespace-nowrap", postfix: " KZT" },
  { name: "isClosed", className: "whitespace-nowrap" },
])
</script>

<style lang="scss" scoped></style>
