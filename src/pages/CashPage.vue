<template>
  <div class="">
    <div
      class="grid grid-cols-10 rounded-xl border border-gray-200 bg-white md:gap-2 md:rounded-lg md:p-4"
    >
      <div class="col-span-10 flex flex-col gap-2 md:col-span-4">
        <div
          v-for="cash in openedCashList"
          :key="cash.id"
          :class="cash.isClosed ? 'bg-gray-100' : 'bg-white'"
          class="overflow-hidden rounded-xl border-gray-200 md:rounded-lg md:border"
        >
          <div class="border-b border-gray-200 bg-blue-50 px-4 py-2">
            <h1 class="text-lg font-medium text-blue-600 md:text-base">
              Открытая касса #{{ cash.id }}
            </h1>
          </div>
          <div
            class="flex justify-between border-b border-gray-200 px-4 py-2 text-lg md:text-base"
          >
            Сумма на начало
            <span class="font-mono font-medium"> {{ cash.startAmount }}</span>
          </div>
          <div
            v-for="(totalPaymentType, i) in cash.totalsPaymentType"
            :key="i"
            class="flex justify-between border-b border-gray-200 px-4 py-2 text-lg md:text-base"
          >
            <span>
              {{ totalPaymentType.paymentType }}
            </span>
            <span class="font-mono text-green-500">
              +{{ totalPaymentType.total }}
            </span>
          </div>
          <div
            class="bg-gray-5 flex justify-between border-b border-gray-200 px-4 py-2 text-lg md:text-base"
          >
            ИТОГО
            <span class="font-mono text-green-500"> {{ cash.total }}</span>
          </div>
          <div class="px-4 py-4 text-lg md:text-base">
            <button
              class="block w-full rounded-xl bg-blue-600 px-4 py-2 text-white hover:brightness-90 active:brightness-90 md:rounded-lg"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-10 flex flex-col gap-2 p-4 md:col-span-6 md:p-0">
        <div
          v-for="cash in closedCashList"
          :key="cash.id"
          :class="cash.isClosed ? 'bg-gray-100' : 'bg-white'"
          class="rounded-xl border border-gray-200 p-4 text-center md:rounded-lg"
        >
          <p>#{{ cash.id }}</p>
          <p class="text-lg text-gray-600 md:text-base">Закрыт</p>
          <!-- <span class="text-lg md:text-base font-mono"> {{ cash-register.total }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
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
