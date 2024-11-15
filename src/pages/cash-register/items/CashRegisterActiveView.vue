<template>
  <a-page :title="getCashTitle" :loading="isLoading" no-padding>
    <template #header>
      <a-modal
        v-if="isActiveCashExists"
        #="{ props }"
        title="Закрыть смену?"
        :async-operation="closeActiveCashRegister"
      >
        <a-button danger v-bind="props"> Закрыть смену </a-button>
      </a-modal>
      <a-link
        v-if="!isActiveCashExists && !isLoading"
        primary
        to="/cash-register/active/add"
      >
        Открыть смену
      </a-link>
    </template>
    <template #floating>
      <a-modal
        v-if="isActiveCashExists"
        #="{ props }"
        title="Закрыть смену?"
        :async-operation="closeActiveCashRegister"
      >
        <a-button-floating-text danger to="/arrivals/items/add" v-bind="props">
          Закрыть смену
        </a-button-floating-text>
      </a-modal>
      <a-link-floating-text
        v-if="!isActiveCashExists && !isLoading"
        primary
        to="/cash-register/active/add"
      >
        Открыть смену
      </a-link-floating-text>
    </template>

    <div
      v-if="isActiveCashExists"
      class="min-h-32 grid grid-cols-1 gap-2 bg-gradient-to-b from-black to-black/80 px-8 py-6 pb-10 md:hidden md:grid-cols-2 md:bg-none md:px-4 md:py-4 md:pb-0"
    >
      <p
        class="flex flex-col rounded-xl md:border md:border-neutral-200 md:bg-white md:px-4 md:py-2"
      >
        <span class="text-base text-white/50 md:text-neutral-300">
          {{ formatDate(activeCash.createdAt, "DD.MM.YYYY HH:MM") }}</span
        >
      </p>
      <p
        class="flex flex-col rounded-xl md:border md:border-neutral-200 md:bg-white md:px-4 md:py-2"
      >
        <span class="text-base text-white/50 md:text-neutral-300">Итого</span>
        <span class="text-3xl font-medium text-blue-400">
          {{ activeCash.total }}
          <span class="font-semibold">₸</span>
        </span>
      </p>
      <p
        class="flex flex-col rounded-xl md:border md:border-neutral-200 md:bg-white md:px-4 md:py-2"
      >
        <span class="text-base text-white/50 md:text-neutral-300">Касса</span>
        <span class="text-3xl font-medium text-white/90 md:text-black/50">
          {{ cashAmount }}
          <span class="font-semibold">₸</span>
        </span>
      </p>
    </div>

    <div
      v-if="isActiveCashExists"
      class="hidden flex-col gap-2 border-b border-neutral-200 bg-white p-4 md:flex"
    >
      <p class="px-4 pb-0 text-base text-white/50 md:text-neutral-300">
        {{ formatDate(activeCash.createdAt, "DD.MM.YYYY HH:MM") }}
      </p>
      <div class="grid grid-cols-2 gap-4">
        <p class="flex flex-col rounded-xl border border-neutral-100 px-4 py-2">
          <span class="text-base text-white/50 md:text-neutral-300">Итого</span>
          <span class="text-3xl font-medium text-blue-600">
            {{ activeCash.total }}
            <span class="font-semibold">₸</span>
          </span>
        </p>
        <p class="flex flex-col rounded-xl border border-neutral-100 px-4 py-2">
          <span class="text-base text-white/50 md:text-neutral-300">Касса</span>
          <span class="text-3xl font-medium text-white/90 md:text-black">
            {{ cashAmount }}
            <span class="font-semibold">₸</span>
          </span>
        </p>
      </div>
    </div>
    <div v-if="isActiveCashExists" class="-mt-10 p-4 md:m-0">
      <a-list
        :items="activeCash.totalsPaymentType"
        title-field="paymentType"
        description-field="total"
        description-hint="₸"
      >
        <template #title="{ item }">{{
          formatPaymentType(item.paymentType)
        }}</template>
        <!-- <template #description="{ item }">
          <span class="font-medium"
            >{{ item.total }}
            <span class="font-semibold">₸</span>
          </span>
        </template> -->
      </a-list>
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <div
        v-if="!isLoading"
        class="flex flex-col items-center justify-center rounded-xl"
      >
        <span class="text-lg text-neutral-300 md:text-base"
          >Смена не найдена</span
        >
      </div>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import AButton from "@/components/ui/AButton.vue"
import ALinkFloatingText from "@/components/ui/ALinkFloatingText.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import AList from "@/components/ui/AList.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatDate } from "@/utils/format-date"

const { serverData: activeCash, sendRequest, isLoading } = useApiRequest()

const getCashTitle = computed(() => {
  if (isActiveCashExists.value) {
    return "Смена #" + activeCash.value.id
  }
  return ""
})

const closeActiveCashRegister = async () => {
  if (isActiveCashExists.value) {
    await sendRequest("put", "/cash-registers/" + activeCash.value.id, {
      isClosed: true,
    })
    await sendRequest("get", "/cash-registers/today")
  }
}

const isActiveCashExists = computed(
  () => !!(activeCash.value && activeCash.value.id),
)

const totalCashAmount = computed(
  () =>
    activeCash.value.totalsPaymentType.find(
      (item) => item.paymentType === "cash",
    )?.total || 0,
)

const cashAmount = computed(
  () => activeCash.value.startAmount + totalCashAmount.value,
)

const formatPaymentType = (paymentType) => {
  const types = {
    cash: "Наличные",
    kaspi_qr: "Kaspi QR",
    online: "Перевод",
  }

  return types[paymentType] || "Другое"
}

onMounted(async () => {
  await sendRequest("get", "/cash-registers/today")
})
</script>

<style lang="scss" scoped></style>
