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
        <a-button-floating primary v-bind="props"> save </a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        id="store-user-name"
        v-model="storeUser.name"
        placeholder="Имя сотрудника"
        type="text"
      />
      <a-base-input
        id="store-user-password"
        v-model="storeUser.password"
        placeholder="Пароль"
        type="text"
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

const router = useRouter()
const storeUser = ref({})

const addStoreUser = async () => {
  try {
    await StoreService.addStoreUser({
      name: storeUser.value.name,
      password: storeUser.value.password,
    })

    router.push("/store/users")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
