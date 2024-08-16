<template>
  <div class="flex justify-center items-center h-full">
    <form
      class="p-4 bg-white rounded-xl md:rounded border border-gray-200 w-96"
      @submit.prevent="loginToStore"
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
      >
        Продолжить
      </button>
    </form>
    <!-- <div
      v-else
      class="p-4 bg-white rounded-xl md:rounded border border-gray-200 w-96"
    >
      <h1 class="text-2xl font-semibold mb-4 text-center">
        {{ storeData.name }}
      </h1>
      <div class="flex flex-col gap-4">
        <button
          v-for="point in storePoints"
          class="font-semibold block w-full px-4 py-2 bg-black text-lg md:text-base text-white rounded-xl md:rounded"
          type="submit"
          :key="point.id"
          @click="loginToStorePoint(point.id)"
        >
          {{ point.name }}
        </button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()
const router = useRouter()
const authData = ref({})

const loginToStore = async () => {
  try {
    const response = await store.loginToStore(authData.value)
    router.push("/store")
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>
