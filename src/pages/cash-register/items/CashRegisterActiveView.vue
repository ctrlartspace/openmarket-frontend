<template>
  <a-page :title="getCashTitle">
    <template #header>
      <a-button
        v-if="isActiveCashExists"
        danger
        to="/arrivals/items/add"
        @click="closeActiveCashRegister"
      >
        Закрыть
      </a-button>
      <a-link v-if="!isActiveCashExists" success to="/cash-register/active/add">
        Открыть
      </a-link>
    </template>

    <div
      v-if="isActiveCashExists"
      class="flex flex-col gap-2 p-4 bg-white border border-neutral-300 rounded"
    >
      <a-base-input
        v-model="activeCash.startAmount"
        label="Сумма на начало"
        placeholder="Сумма на начало"
        type="text"
        unit="KZT"
      />
      <div class="flex flex-col gap-2">
        <a-base-input
          v-for="(total, i) in activeCash.totalsPaymentType"
          :key="i"
          v-model="total.total"
          :label="total.paymentType + ': ' + total.count"
          placeholder="Итого"
          type="text"
          unit="KZT"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import { computed, onMounted, ref } from "vue"
import { closeCashRegister, getActiveCash } from "@/services/CashService.js"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AButton from "@/components/ui/AButton.vue"

const activeCash = ref(null)

const getCashTitle = computed(() => {
  if (isActiveCashExists.value) {
    return "Касса #" + activeCash.value.id
  }
  return ""
})

const closeActiveCashRegister = async () => {
  if (isActiveCashExists.value) {
    await closeCashRegister(activeCash.value.id)
    await fetchActiveCash()
  }
}

const isActiveCashExists = computed(
  () => !!activeCash.value && activeCash.value.id,
)

const fetchActiveCash = async () => {
  activeCash.value = await getActiveCash()
}

onMounted(async () => {
  await fetchActiveCash()
})
</script>

<style lang="scss" scoped></style>
