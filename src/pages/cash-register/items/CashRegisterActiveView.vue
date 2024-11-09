<template>
  <a-page :title="getCashTitle" :loading="isLoading" no-padding>
    <template #header>
      <a-modal
        v-if="isActiveCashExists"
        #="{ props }"
        title="Закрыть кассу?"
        :async-operation="closeActiveCashRegister"
      >
        <a-button danger v-bind="props"> Закрыть </a-button>
      </a-modal>
      <a-link v-if="!isActiveCashExists" primary to="/cash-register/active/add">
        Открыть
      </a-link>
    </template>
    <template #floating>
      <a-modal
        v-if="isActiveCashExists"
        #="{ props }"
        title="Закрыть кассу?"
        :async-operation="closeActiveCashRegister"
      >
        <a-button-floating-text danger to="/arrivals/items/add" v-bind="props">
          Закрыть
        </a-button-floating-text>
      </a-modal>
      <a-link-floating-text
        v-if="!isActiveCashExists"
        primary
        to="/cash-register/active/add"
      >
        Открыть
      </a-link-floating-text>
    </template>

    <div
      class="min-h-32 flex flex-col bg-gradient-to-b from-black to-black/80 px-8 py-6 pb-10 md:border-b md:border-neutral-200 md:from-white/50 md:to-white/50"
      v-if="isActiveCashExists"
    >
      <div class="grid grid-cols-2 gap-2">
        <p class="flex flex-col">
          <span class="text-green-200/50 md:text-green-500/50">Итого</span>
          <span class="text-3xl font-medium text-green-400 md:text-green-400">
            {{ activeCash.total }}
            <span class="font-semibold">₸</span>
          </span>
        </p>
        <p class="flex flex-col">
          <span class="text-white/50 md:text-black/50">Касса</span>
          <span class="text-3xl font-medium text-white/90 md:text-black">
            {{ cashAmount }}
            <span class="font-semibold">₸</span>
          </span>
        </p>

        <!-- <div
          class="rounded-xl border border-neutral-300 bg-white px-4 py-2 md:rounded-lg md:border-neutral-200"
        >
          <h1 class="text-lg md:text-base">На кассе</h1>
          <p class="text-2xl font-medium">
            {{ cashAmount }}
            <span class="font-semibold">₸</span>
          </p>
        </div> -->
      </div>
    </div>

    <div v-if="activeCash" class="-mt-10 p-4">
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

const { serverData: activeCash, sendRequest, isLoading } = useApiRequest()
const {
  serverData: activeCashTotalTakes,
  sendRequest: fetchActiveCashTotalTakes,
  isLoading: isActiveCashTotalTakesLoading,
} = useApiRequest()

const getCashTitle = computed(() => {
  if (isActiveCashExists.value) {
    return "Касса #" + activeCash.value.id
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
  await fetchActiveCashTotalTakes("get", "/cash-registers/takes/total")
})
</script>

<style lang="scss" scoped></style>
