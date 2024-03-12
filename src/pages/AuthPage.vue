<template>
  <div class="flex justify-center items-center p-4 md:p-2 h-full">
    <form
      class="p-4 bg-white rounded-xl md:rounded border border-gray-200 w-96"
      @submit.prevent="logIn"
    >
      <input
        v-model.trim="authData.name"
        type="text"
        class="mb-2 block w-full px-4 py-2 text-lg md:text-base bg-inherit border border-gray-200 rounded-xl md:rounded appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
        placeholder="Номер кабинета"
      />
      <input
        v-model.trim="authData.password"
        type="text"
        class="mb-4 block w-full px-4 py-2 text-lg md:text-base bg-inherit border border-gray-200 rounded-xl md:rounded appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
        placeholder="Пароль"
      />
      <button
        class="block w-full px-4 py-2 bg-blue-600 text-lg md:text-base text-white rounded-xl md:rounded"
        type="submit"
        @click="logIn"
      >
        Продолжить
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

const logIn = async () => {
  console.log(authData.value)
  await store.logIn(authData.value)
  router.push("/")
}
</script>

<style></style>
