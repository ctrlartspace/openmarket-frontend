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
      <a-link v-if="!isActiveCashExists" primary to="/cash-register/active/add">
        Открыть
      </a-link>
    </template>
    <template #floating>
      <a-button-floating
        v-if="isActiveCashExists"
        danger
        to="/arrivals/items/add"
        @click="closeActiveCashRegister"
      >
        close
      </a-button-floating>
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
        <h1>Сумма на начало</h1>
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
          <h1
            class="inline rounded px-1 font-medium"
            :class="{
              'bg-blue-50 text-blue-500': total.paymentType === 'online',
              'bg-red-50 text-red-500': total.paymentType === 'kaspi-qr',
              'bg-green-50 text-green-500': total.paymentType === 'cash',
            }"
          >
            {{ total.paymentType }}
          </h1>
          <p class="text-2xl font-medium">
            {{ total.total }}
            <span class="font-semibold">₸</span>
          </p>
        </div>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import { computed, onMounted, ref } from "vue"
import { closeCashRegister, getActiveCash } from "@/services/CashService.js"
import AButton from "@/components/ui/AButton.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"

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
