import AppDialogVue from '@/components/AppDialog.vue';
<template>
  <a-page title="Информация">
    <template #header>
      <a-button neutral v-if="step > 1" @click="step = step - 1">
        Назад
      </a-button>
      <a-button primary @click="step = step + 1"> Далее </a-button>
    </template>
    <template #floating>
      <a-button-floating-text neutral v-if="step > 1" @click="step = step - 1">
        Назад
      </a-button-floating-text>
      <a-button-floating-text v-if="step < 3" primary @click="step = step + 1">
        Далее
      </a-button-floating-text>
      <a-modal
        v-if="step > 2"
        #="{ props }"
        title="Создать магазин?"
        :async-operation="onAddItemsToPointClick"
      >
        <a-button-floating-text v-bind="props" primary>
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>

    <div v-if="step === 1" class="flex flex-col gap-2">
      <a-base-input
        v-model="data.user.phone_number"
        label="Номер телефона"
        placeholder="Номер телефона"
        type="text"
      />
      <a-base-input
        v-model="data.user.full_name"
        label="Имя"
        placeholder="Имя"
        type="text"
        autocomplete="new-text"
      />
      <a-base-input
        v-model="data.user.password"
        label="Пароль"
        placeholder="Пароль"
        type="password"
        autocomplete="new-password"
      />
    </div>
    <div v-if="step === 2" class="flex flex-col gap-2">
      <a-base-input
        v-model="data.store.full_name"
        label="Название магазина"
        placeholder="Название магазина"
        type="text"
      />
      <a-base-input
        v-model="data.store.address"
        label="Адрес"
        placeholder="Адрес"
        type="text"
      />
    </div>
    <div v-if="step === 3" class="flex flex-col gap-4">
      <div
        class="flex w-full flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4 md:rounded-lg"
      >
        <div class="flex items-start gap-4 rounded-xl">
          <div
            class="flex aspect-square h-12 w-12 items-center justify-center rounded-xl bg-blue-400 p-2 text-white md:rounded-lg"
          >
            <span class="material-symbols-outlined text-3xl">person</span>
          </div>
          <div class="h-full w-full">
            <p class="font-medium">{{ data.user.full_name }}</p>
            <p>{{ data.user.phone_number }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="flex items-center justify-center">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white"
        >
          <span class="material-symbols-outlined text-4xl text-neutral-400"
            >arrow_downward_alt</span
          >
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white"
        >
          <span class="material-symbols-outlined animate-spin text-4xl"
            >autorenew</span
          >
        </div>
      </div> -->
      <div
        class="flex w-full flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4 md:rounded-lg"
      >
        <h1 class="text-lg font-medium md:text-base">Магазин</h1>
        <div class="flex gap-4 rounded-xl">
          <div
            class="flex aspect-square h-12 w-12 items-center justify-center rounded-xl bg-green-400 p-2 text-white md:rounded-lg"
          >
            <span class="material-symbols-outlined text-3xl">person</span>
          </div>
          <div class="h-full w-full">
            <p class="font-medium">{{ data.store.full_name }}</p>
            <p>{{ data.store.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AModal from "@/components/ui/AModal.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const { validationErrors, sendRequest: addStorePoint } = useApiRequest()

const step = ref(1)
const data = ref({
  user: { phone_number: "7747906904", full_name: "Аман Киргизбаев" },
  store: { full_name: "Rozetka", address: "Калдаякова 14" },
})
</script>

<style lang="scss" scoped></style>
