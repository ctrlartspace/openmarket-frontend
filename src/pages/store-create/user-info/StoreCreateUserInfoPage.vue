import AppDialogVue from '@/components/AppDialog.vue';
<template>
  <a-page title="Информация">
    <template #header>
      <a-button v-if="step > 1" gray @click="step = step - 1"> Назад </a-button>
      <a-button v-if="step < 3" primary @click="step = step + 1">
        Далее
      </a-button>
      <a-modal
        v-if="step > 2"
        #="{ props }"
        :async-operation="createData"
        title="Создать магазин?"
      >
        <a-button primary v-bind="props"> Готово</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-button-floating-text v-if="step > 1" gray @click="step = step - 1">
        Назад
      </a-button-floating-text>
      <a-button-floating-text v-if="step < 3" primary @click="step = step + 1">
        Далее
      </a-button-floating-text>
      <a-modal
        v-if="step > 2"
        #="{ props }"
        :async-operation="createData"
        title="Создать магазин?"
      >
        <a-button-floating-text primary v-bind="props">
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <template v-if="isError" #error>
      {{ errorMessage }}
    </template>

    <div v-if="step === 1" class="flex flex-col gap-2">
      <a-base-input
        v-model="data.user.phoneNumber"
        :is-error="validationErrors?.userInfo?.phoneNumber"
        label="Номер телефона"
        placeholder="Номер телефона"
        type="text"
      />
      <a-base-input
        v-model="data.user.fullName"
        :is-error="validationErrors?.userInfo?.fullName"
        autocomplete="new-text"
        label="Имя"
        placeholder="Имя"
        type="text"
      />
      <a-base-input
        v-model="data.user.password"
        :is-error="validationErrors?.userInfo?.password"
        autocomplete="new-password"
        label="Пароль"
        placeholder="Пароль"
        type="password"
      />
    </div>
    <div v-if="step === 2" class="flex flex-col gap-2">
      <a-base-input
        v-model="data.store.fullName"
        :is-error="validationErrors?.storeInfo?.fullName"
        label="Название магазина"
        placeholder="Название магазина"
        type="text"
      />
      <a-base-input
        v-model="data.store.address"
        :is-error="validationErrors?.storeInfo?.address"
        label="Адрес"
        placeholder="Адрес"
        type="text"
      />
    </div>
    <div v-if="step === 3" class="flex flex-col gap-4">
      <div
        class="flex w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-4"
      >
        <div class="flex items-start gap-4 rounded-xl">
          <div
            class="flex aspect-square h-[55px] w-[55px] items-center justify-center rounded-xl bg-blue-600 p-2 text-white"
          >
            <span class="material-symbols-rounded text-xl">person</span>
          </div>
          <div class="h-full w-full">
            <p class="font-medium">{{ data.user.fullName }}</p>
            <p>{{ data.user.phoneNumber }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="flex items-center justify-center">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white  "
        >
          <span class="material-symbols-rounded text-4xl">unfold_more</span>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white  "
        >
          <span class="material-symbols-rounded animate-spin text-4xl"
            >autorenew</span
          >
        </div>
      </div> -->
      <div
        class="flex w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-4"
      >
        <h1 class="font-medium">Магазин</h1>
        <div class="flex gap-4 rounded-xl">
          <div
            class="flex aspect-square h-12 w-12 items-center justify-center rounded-xl bg-gray-600 p-2 text-white"
          >
            <span class="material-symbols-rounded text-xl">store</span>
          </div>
          <div class="h-full w-full">
            <p class="font-medium">{{ data.store.fullName }}</p>
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
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()

const { validationErrors, sendRequest, isLoading, errorMessage, isError } =
  useApiRequest()

const step = ref(1)
const data = ref({
  user: { phoneNumber: "", fullName: "" },
  store: { fullName: "", address: "" },
})

const createData = async () => {
  const response = await sendRequest("post", "/store", {
    userInfo: data.value.user,
    storeInfo: data.value.store,
  })
  if (response) {
    store.logOut()
  }
}
</script>

<style lang="scss" scoped></style>
