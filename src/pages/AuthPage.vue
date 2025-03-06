<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-black"
  >
    <form
      class="flex w-5/6 flex-col gap-2 rounded-xl border border-gray-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 md:w-64"
      @submit.prevent="loginToStore"
    >
      <div class="flex-auto">
        <InputMask
          v-model="authData.phoneNumber"
          fluid
          mask="+7(999)999-99-99"
          placeholder="Номер телефона"
          type="tel"
          unmask
        />
      </div>

      <div class="flex-auto">
        <InputText
          v-model="authData.password"
          fluid
          placeholder="Пароль"
          type="password"
        />
      </div>
      <button
        v-press
        class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white shadow-sm dark:border dark:border-neutral-800 dark:text-neutral-200"
        type="submit"
      >
        <span
          v-if="isLoading"
          class="material-symbols-rounded animate-spin font-semibold"
          >progress_activity</span
        >
        <span v-else> Продолжить </span>
      </button>
      <!--      <p class="mt-2 text-center text-gray-400">-->
      <!--        Нет магазина?-->
      <!--        <router-link-->
      <!--          :to="{ path: '/store-create' }"-->
      <!--          class="font-medium text-blue-500"-->
      <!--          >Создать-->
      <!--        </router-link>-->
      <!--      </p>-->
      <button
        class="font-medium text-blue-500 dark:text-blue-400"
        type="button"
        @click="loginAsGuest"
      >
        Войти как гость
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()
const router = useRouter()
const authData = ref({})
const isLoading = ref(false)

const loginToStore = async () => {
  try {
    isLoading.value = true
    const response = await store.loginToStore(authData.value)
    if (response) {
      await router.push("/store")
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const loginAsGuest = async () => {
  authData.value.phoneNumber = "0000000000"
  authData.value.password = "guest"
  await loginToStore()
}
</script>

<style></style>
