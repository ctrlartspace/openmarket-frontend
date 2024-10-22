<template>
  <a-page :title="getCashTitle" :loading="isLoading">
    <template #header>
      <a-modal
        #="{ props }"
        title="Закрыть кассу?"
        :async-operation="closeActiveCashRegister"
      >
        <a-button v-if="isActiveCashExists" danger v-bind="props">
          Закрыть
        </a-button>
      </a-modal>
      <a-link v-if="!isActiveCashExists" primary to="/cash-register/active/add">
        Открыть
      </a-link>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Закрыть кассу?"
        :async-operation="closeActiveCashRegister"
      >
        <a-button-floating
          v-if="isActiveCashExists"
          danger
          to="/arrivals/items/add"
          v-bind="props"
        >
          close
        </a-button-floating>
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
      <div
        class="rounded-xl border border-neutral-300 bg-white p-4 md:rounded-lg"
      >
        <h1 class="text-lg md:text-base">Сумма на начало</h1>
        <p class="text-2xl font-medium">
          {{ activeCash.startAmount }}
          <span class="font-semibold">₸</span>
        </p>
      </div>
      <div
        v-if="activeCash.totalsPaymentType.length > 0"
        class="flex flex-col rounded-xl border border-neutral-300 bg-white md:flex-row md:rounded-lg"
      >
        <div
          class="border-b border-neutral-300 px-4 py-2 last:border-none md:flex-1 md:border-b-0 md:border-r"
          v-for="total in activeCash.totalsPaymentType"
          :key="total.paymentType"
        >
          <div v-if="total.paymentType === 'online'">
            <h1 class="inline rounded text-lg text-blue-500 md:text-base">
              Перевод
            </h1>
            <p class="text-2xl font-medium">
              {{ total.total }}
              <span class="font-semibold">₸</span>
            </p>
          </div>
          <div v-if="total.paymentType === 'kaspi-qr'">
            <h1 class="inline rounded text-lg text-red-500 md:text-base">
              Kaspi QR
            </h1>
            <p class="text-2xl font-medium">
              {{ total.total }}
              <span class="font-semibold">₸</span>
            </p>
          </div>
          <div v-if="total.paymentType === 'cash'">
            <h1 class="inline text-lg text-green-500 md:text-base">Наличные</h1>
            <p class="text-2xl font-medium">
              {{ total.total }}
              <span class="font-semibold">₸</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="p-4 text-center text-lg text-neutral-300 md:text-base">
        Касса не найдена
      </p>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import AButton from "@/components/ui/AButton.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"

const { serverData: activeCash, sendRequest, isLoading } = useApiRequest()

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
    await sendRequest("get", "/cash-registers/active")
  }
}

const isActiveCashExists = computed(
  () => !!activeCash.value && activeCash.value.id,
)

onMounted(async () => {
  await sendRequest("get", "/cash-registers/active")
})
</script>

<style lang="scss" scoped></style>
