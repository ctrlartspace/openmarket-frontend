<template>
  <a-page title="Новый сотрудник">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="addStoreUser"
        title="Добавить сотрудника?"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="addStoreUser"
        title="Добавить сотрудника?"
      >
        <a-button-floating-text primary v-bind="props">
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <template v-if="isError" #error>
      {{ errorMessage }}
    </template>
    <div class="flex flex-col gap-2">
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Номер телефона </label>
        <InputMask
          v-model="storeUser.phoneNumber"
          :invalid="validationErrors?.phoneNumber"
          fluid
          mask="+7(999)999-99-99"
          placeholder="Номер телефона"
          unmask
        />
      </div>
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Полное имя</label>
        <InputText
          v-model="storeUser.fullName"
          :invalid="validationErrors?.fullName"
          fluid
          placeholder="Полное имя"
        />
      </div>

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Пароль</label>
        <InputText
          v-model="storeUser.password"
          :invalid="validationErrors?.password"
          fluid
          placeholder="Пароль"
        />
      </div>

      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Роль</label>
        <MultiSelect
          v-model="storeUser.roleIds"
          :invalid="validationErrors?.roleIds"
          :options="roles"
          fluid
          optionLabel="name"
          optionValue="id"
          placeholder="Выберите роли"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const storeUser = ref({})
const { validationErrors, sendRequest, isError, errorMessage } = useApiRequest()
const { serverData: roles, sendRequest: fetchRoles } = useApiRequest()

const addStoreUser = async () => {
  const response = await sendRequest("post", "/store/users", storeUser.value)
  if (response) {
    await router.push("/store/users")
  }
}

onMounted(async () => {
  await fetchRoles("get", "/store/roles")
})
</script>

<style lang="scss" scoped></style>
