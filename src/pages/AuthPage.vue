<template>
  <div class="flex justify-center items-center h-full">
    <form
      class="flex flex-col gap-2 p-4 bg-white rounded-xl md:rounded border border-neutral-300 w-64"
      @submit.prevent="loginToStore"
    >
      <a-base-input v-model.trim="authData.name" placeholder="Номер магазина" />
      <a-base-input
        v-model.trim="authData.password"
        placeholder="Пароль"
        type="password"
      />
      <button
        class="font-medium mt-2 block w-full px-4 py-2 bg-blue-600 text-lg md:text-base text-white rounded-xl md:rounded"
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
import ABaseInput from "@/components/ui/ABaseInput.vue"

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
