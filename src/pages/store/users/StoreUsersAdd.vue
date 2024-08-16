<template>
  <a-page title="Новый сотрудник">
    <template #header>
      <button class="text-base font-medium text-blue-600" @click="addStoreUser">
        Сохранить
      </button>
    </template>
    <div class="flex flex-col gap-2">
      <a-base-input
        v-model="storeUser.name"
        id="store-user-name"
        type="text"
        placeholder="Имя сотрудника"
      />
      <a-base-input
        v-model="storeUser.password"
        id="store-user-password"
        type="text"
        placeholder="Пароль"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import StoreService from "@/services/StoreService"
import { useRouter } from "vue-router"

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
