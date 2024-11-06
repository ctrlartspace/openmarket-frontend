<template>
  <a-page :title="getCashTitle" :loading="isLoading">
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
      <a-link-floating
        v-if="!isActiveCashExists"
        primary
        to="/cash-register/active/add"
      >
        add
      </a-link-floating>
    </template>

    <div class="flex flex-col gap-2" v-if="isActiveCashExists">
      <div class="grid grid-cols-1 gap-2">
        <div
          class="rounded-xl border border-neutral-300 bg-white px-4 py-2 md:rounded-lg"
        >
          <h1 class="inline text-lg md:text-base">Итого</h1>
          <p class="text-2xl font-medium">
            {{ activeCash.total }}
            <span class="font-semibold">₸</span>
          </p>
        </div>

        <div
          class="rounded-xl border border-neutral-300 bg-white px-4 py-2 md:rounded-lg"
        >
          <h1 class="text-lg md:text-base">На кассе</h1>
          <p class="text-2xl font-medium">
            {{ cashAmount }}
            <span class="font-semibold">₸</span>
          </p>
        </div>
      </div>
      <a-list
        :items="activeCash.totalsPaymentType"
        title-field="paymentType"
        description-field="total"
        description-hint="₸"
      >
        <template #title="{ item }">{{
          formatPaymentType(item.paymentType)
        }}</template>
      </a-list>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import AButton from "@/components/ui/AButton.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
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
