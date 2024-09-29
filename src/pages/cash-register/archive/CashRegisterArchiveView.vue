<template>
  <a-page title="История">
    <template #header></template>
    <data-table
      :selectable="false"
      :table-data="cashRegisters"
      :table-fields="tableFields"
    >
      <template #id="{ item }">
        <span class="text-lg font-medium md:text-base"
          >Касса #{{ item.id }}</span
        >
      </template>
      <template #isClosed="{ item }">
        <span
          v-if="item.isClosed"
          class="rounded bg-neutral-50 px-4 py-1 text-lg font-medium text-neutral-500 md:text-base"
          >Закрыта</span
        >
        <span
          v-else
          class="rounded bg-green-50 px-4 py-1 text-lg font-medium text-green-600 md:text-base"
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
  // { name: "total", className: "whitespace-nowrap", postfix: " ₸" },
  { name: "isClosed", className: "whitespace-nowrap" },
])
</script>

<style lang="scss" scoped></style>
