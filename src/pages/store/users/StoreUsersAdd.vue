<template>
  <a-page title="Новый сотрудник">
    <template #header>
      <a-modal
        #="{ props }"
        title="Добавить сотрудника?"
        :async-operation="addStoreUser"
      >
        <a-button primary v-bind="props"> Сохранить </a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Добавить сотрудника?"
        :async-operation="addStoreUser"
      >
        <a-button-floating-text primary v-bind="props">
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        id="store-user-phone-number"
        v-model="storeUser.phoneNumber"
        placeholder="Номер телефона"
        type="text"
        :is-error="validationErrors.phoneNumber"
      />
      <a-base-input
        id="store-user-name"
        v-model="storeUser.fullName"
        placeholder="Имя сотрудника"
        type="text"
        :is-error="validationErrors.fullName"
      />
      <a-base-input
        id="store-user-password"
        v-model="storeUser.password"
        placeholder="Пароль"
        type="text"
        :is-error="validationErrors.password"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const storeUser = ref({})
const { validationErrors, sendRequest } = useApiRequest()

const addStoreUser = async () => {
  const payload = {
    phoneNumber: storeUser.value.phoneNumber,
    fullName: storeUser.value.fullName,
    password: storeUser.value.password,
  }

  const response = await sendRequest("post", "/store/users", payload)
  if (response) {
    router.push("/store/users")
  }
}
</script>

<style lang="scss" scoped></style>
