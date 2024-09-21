<template>
  <a-page title="Добавить сотрудника">
    <template #header>
      <a-button primary @click="addPointUser"> Сохранить</a-button>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/store/users',
          query: { selectableMode: true },
        }"
        class="px-4 py-2 border border-neutral-300 rounded-xl md:rounded bg-white hover:border-neutral-500"
      >
        <div v-if="selectedUser">
          <h1 class="text-base font-medium">
            {{ selectedUser.name }}
          </h1>
        </div>
        <p v-else>Выбрать сотрудника...</p>
      </router-link>
    </div>
  </a-page>
</template>

<script setup>
import { useRouter } from "vue-router"
import PointUserService from "@/services/point/users.js"
import AButton from "@/components/ui/AButton.vue"
import { useSelect } from "@/composables/useSelect.js"
import { getStoreUser } from "@/services/store/users.js"

const { selectedItem: selectedUser } = useSelect(getStoreUser)

const router = useRouter()

const addPointUser = async () => {
  try {
    if (selectedUser.value) {
      await PointUserService.addPointUser(selectedUser.value.id)
      await router.push("/point/users")
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
