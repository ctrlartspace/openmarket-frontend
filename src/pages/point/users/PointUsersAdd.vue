<template>
  <a-page title="Добавить сотрудника">
    <template #header>
      <a-button primary @click="addPointUser"> Сохранить</a-button>
    </template>
    <template #floating>
      <a-button-floating primary @click="addPointUser"> save</a-button-floating>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/store/users',
          query: { selectableMode: true },
        }"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-500 md:rounded-lg"
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
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import { useSelect } from "@/composables/useSelect2.js"

const { selectedItem: selectedUser } = useSelect()

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
