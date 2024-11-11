<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-4 bg-neutral-100"
  >
    <form
      class="flex w-64 flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4 md:border-neutral-200"
      @submit.prevent="loginToStore"
    >
      <a-base-input
        v-model.trim="authData.phoneNumber"
        placeholder="Номер телефона"
      />
      <a-base-input
        v-model.trim="authData.password"
        placeholder="Пароль"
        type="password"
      />
      <button
        class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-gradient-to-b from-black/80 to-black px-4 py-2 text-lg font-medium text-white shadow-sm md:text-base"
        type="submit"
        v-press
      >
        <span
          v-if="isLoading"
          class="material-symbols-outlined animate-spin font-semibold"
          >progress_activity</span
        >
        <span v-else> Продолжить </span>
      </button>
      <p class="mt-2 text-center text-neutral-400">
        Нет магазина?
        <router-link
          class="font-medium text-blue-500"
          :to="{ path: '/store-create' }"
          >Создать
        </router-link>
      </p>
    </form>
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
const isLoading = ref(false)

const loginToStore = async () => {
  try {
    isLoading.value = true
    const response = await store.loginToStore(authData.value)
    if (response) {
      router.push("/store")
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style></style>
