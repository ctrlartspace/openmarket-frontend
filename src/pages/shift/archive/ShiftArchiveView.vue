<template>
  <a-page title="История">
    <template #header></template>
    <a-list
      v-if="cashRegisters"
      :items="cashRegisters"
      title-field="id"
      description-field="isClosed"
    >
      <template #title="{ item }">
        <span class="font-medium">Смена #{{ item.id }}</span>
      </template>
      <template #description="{ item }">
        <span
          v-if="item.isClosed"
          class="rounded bg-neutral-50 px-4 py-1 font-medium text-neutral-500"
          >{{ item.total }} <span class="font-semibold">₸</span></span
        >
        <span
          v-else
          class="rounded bg-green-50 px-4 py-1 font-medium text-green-500"
          >{{ item.total }} <span class="font-semibold">₸</span></span
        >
      </template>
    </a-list>
  </a-page>
</template>

<script setup>
import { getCashRegisters } from "@/services/CashService.js"
import { onMounted, ref } from "vue"
import AList from "@/components/ui/AList.vue"

const cashRegisters = ref([])

const fetchCashRegisters = async () => {
  cashRegisters.value = await getCashRegisters()
}

onMounted(async () => {
  await fetchCashRegisters()
})
</script>

<style lang="scss" scoped></style>
