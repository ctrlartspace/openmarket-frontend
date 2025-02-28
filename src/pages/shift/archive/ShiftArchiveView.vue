<template>
  <a-page title="История">
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>
    </template>
    <a-list
      v-if="cashRegisters"
      :items="cashRegisters"
      description-field="isClosed"
      title-field="id"
    >
      <template #title="{ item }">
        <span class="">Смена {{ item.id }}</span>
      </template>
      <template #description="{ item }">
        <span
          v-if="item.isClosed"
          class="font-medium text-gray-400 dark:text-neutral-600"
          >{{ formatMoney(item.total) }}
          <span class="font-semibold">₸</span></span
        >
        <span v-else class="font-medium text-black dark:text-neutral-200"
          >{{ formatMoney(item.total) }}
          <span class="font-semibold">₸</span></span
        >
      </template>

      <template #sub="{ item }">
        <span class="text-gray-300 dark:text-neutral-600">{{
          formatDate(item.createdAt, "DD.MM.YYYY HH:mm") +
          (item.isClosed ? " - " + formatDate(item.updatedAt, "HH:mm") : "")
        }}</span>
      </template>
    </a-list>
  </a-page>
</template>

<script setup>
import { getWorkShifts } from "@/services/CashService.js"
import { onMounted, ref } from "vue"
import { formatDate } from "@/utils/format-date"
import { formatMoney } from "@/utils/format-money"

import AList from "@/components/ui/AList.vue"

const cashRegisters = ref([])

const fetchCashRegisters = async () => {
  cashRegisters.value = await getWorkShifts()
}

onMounted(async () => {
  await fetchCashRegisters()
})
</script>

<style lang="scss" scoped></style>
