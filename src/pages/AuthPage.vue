<template>
  <div class="flex justify-center">
    <form
      class="p-4 bg-white rounded border border-gray-200 w-96"
      @submit.prevent="logIn"
    >
      <h1 class="text-lg mb-4 font-semibold uppercase">Авторизация</h1>
      <input
        v-model.trim="authData.login"
        type="text"
        class="mb-2 block w-full px-4 py-2 text-lg bg-inherit border border-gray-200 rounded appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
        placeholder="Номер кабинета"
      />
      <input
        v-model.trim="authData.password"
        type="text"
        class="mb-4 block w-full px-4 py-2 text-lg bg-inherit border border-gray-200 rounded appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
        placeholder="Пароль"
      />
      <button
        class="block w-full px-4 py-2 bg-blue-600 text-lg text-white rounded"
        type="submit"
      >
        Продолжить
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()
const authData = ref({})

const logIn = async () => {
  await store.logIn(authData)
}
</script>

<style></style>
