<template>
  <a-page title="Добавить сотрудника">
    <template #header>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        @click="$router.back()"
      >
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </button>
      <a-modal
        v-if="selectedUser"
        #="{ props }"
        :async-operation="addPointUser"
        title="Добавить сотрудника?"
      >
        <button
          class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-blue-600"
          v-bind="props"
        >
          <span class="material-symbols-rounded">save</span>
          <span class="font-medium"> Сохранить</span>
        </button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        v-if="selectedUser"
        #="{ props }"
        :async-operation="addPointUser"
        title="Добавить сотрудника?"
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
        class="rounded-xl border border-gray-100 bg-white px-4 py-3 hover:border-gray-500"
      >
        <div v-if="selectedUser">
          <h1 class="font-medium">
            {{ selectedUser.fullName }}
          </h1>
        </div>
        <p v-else class=" ">Выбрать сотрудника...</p>
      </router-link>
    </div>
  </a-page>
</template>

<script setup>
import { useRouter } from "vue-router"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import { useSelect } from "@/composables/useSelect2.js"
import AModal from "@/components/ui/AModal.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const { selectedItem: selectedUser } = useSelect()
const { sendRequest } = useApiRequest()

const router = useRouter()

const addPointUser = async () => {
  if (!selectedUser.value) {
    return
  }
  const response = await sendRequest("post", "/point/users", {
    id: selectedUser.value.id,
  })
  if (response) {
    await router.push("/point/users")
  }
}
</script>

<style lang="scss" scoped></style>
