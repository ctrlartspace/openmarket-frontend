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
        <a-button-floating v-bind="props"> save </a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <p v-if="hasValidationErrors" class="text-center text-lg md:text-base">
        Заполните поля
      </p>
      <a-base-input
        id="store-user-name"
        v-model="storeUser.name"
        placeholder="Имя сотрудника"
        type="text"
        :is-error="validationErrors.name"
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
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const storeUser = ref({})
const { validationErrors, hasValidationErrors, sendRequest } = useApiRequest()

const addStoreUser = async () => {
  const payload = {
    name: storeUser.value.name,
    password: storeUser.value.password,
  }

  const response = await sendRequest("post", "/store/users", payload)
  if (response) {
    router.push("/store/users")
  }
}
</script>

<style lang="scss" scoped></style>
