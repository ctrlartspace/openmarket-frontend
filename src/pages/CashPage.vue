<template>
  <div class="p-4 md:p-2">
    <div
      class="grid grid-cols-10 bg-white md:rounded rounded-xl border border-gray-200 md:p-4 md:gap-2"
    >
      <div class="col-span-10 flex flex-col gap-2 md:col-span-4">
        <div
          v-for="cash in openedCashList"
          class="md:rounded rounded-xl md:border border-gray-200 overflow-hidden"
          :class="cash.isClosed ? 'bg-gray-100' : 'bg-white'"
          :key="cash.id"
        >
          <div class="px-4 py-2 border-b border-gray-200 bg-blue-50">
            <h1 class="text-lg md:text-base font-medium text-blue-600">
              Открытая касса #{{ cash.id }}
            </h1>
          </div>
          <div
            class="px-4 py-2 text-lg md:text-base border-b border-gray-200 flex justify-between"
          >
            Сумма на начало
            <span class="font-mono font-medium"> {{ cash.startAmount }}</span>
          </div>
          <div
            v-for="(totalPaymentType, i) in cash.totalsPaymentType"
            class="px-4 py-2 text-lg md:text-base flex justify-between border-b border-gray-200"
            :key="i"
          >
            <span>
              {{ totalPaymentType.paymentType }}
            </span>
            <span class="font-mono text-green-500">
              +{{ totalPaymentType.total }}
            </span>
          </div>
          <div
            class="px-4 py-2 text-lg md:text-base bg-gray-5 border-b border-gray-200 flex justify-between"
          >
            ИТОГО
            <span class="font-mono text-green-500"> {{ cash.total }}</span>
          </div>
          <div class="px-4 py-4 text-lg md:text-base">
            <button
              class="block w-full bg-blue-600 text-white px-4 py-2 md:rounded rounded-xl hover:brightness-90"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-10 flex flex-col gap-2 md:col-span-6 p-4 md:p-0">
        <div
          v-for="cash in closedCashList"
          class="p-4 md:rounded rounded-xl border border-gray-200 text-center"
          :class="cash.isClosed ? 'bg-gray-100' : 'bg-white'"
          :key="cash.id"
        >
          <span class="text-lg md:text-base text-gray-600">Закрыт </span>
          <!-- <span class="text-lg md:text-base font-mono"> {{ cash.total }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as CashService from "@/services/CashService"

const closedCashList = ref([])
const openedCashList = ref([])

onMounted(async () => {
  const cashList = await CashService.getCashes()
  cashList.forEach((cash) => {
    if (cash.isClosed) {
      closedCashList.value.push(cash)
    } else {
      openedCashList.value.push(cash)
    }
  })
})
</script>

<style></style>
