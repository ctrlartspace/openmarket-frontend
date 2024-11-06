<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-4 bg-neutral-100"
  >
    <form
      class="flex w-64 flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4 md:rounded-lg"
      @submit.prevent="loginToStore"
    >
      <a-base-input v-model.trim="authData.name" placeholder="Номер магазина" />
      <a-base-input
        v-model.trim="authData.password"
        placeholder="Пароль"
        type="password"
      />
      <button
        class="mt-2 block w-full rounded-xl bg-black px-4 py-2 text-lg font-medium text-white md:rounded-lg md:text-base"
        type="submit"
        v-press
      >
        Продолжить
      </button>
    </form>
    <div
      class="w-64 rounded-xl border border-neutral-300 bg-white p-4 md:rounded-lg"
    >
      <p class="text-center text-neutral-400">
        У вас еще нет магазина?
        <router-link
          class="font-medium text-blue-500"
          :to="{ path: '/store-create' }"
          >Создать
        </router-link>
      </p>
    </div>
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
    router.push("/store/points")
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>
