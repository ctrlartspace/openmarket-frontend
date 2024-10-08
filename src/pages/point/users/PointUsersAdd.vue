<template>
  <a-page title="Добавить сотрудника">
    <template #header>
      <a-modal
        #="{ props }"
        title="Добавить сотрудника?"
        :async-operation="addPointUser"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Добавить сотрудника?"
        :async-operation="addPointUser"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
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
          <h1 class="text-lg font-medium md:text-base">
            {{ selectedUser.name }}
          </h1>
        </div>
        <p class="text-lg md:text-base" v-else>Выбрать сотрудника...</p>
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
import AModal from "@/components/ui/AModal.vue"

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
