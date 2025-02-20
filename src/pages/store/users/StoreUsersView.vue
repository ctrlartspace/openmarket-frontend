<template>
  <a-page>
    <template #header>
      <button
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        @click="$router.back()"
      >
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </button>
      <router-link
        :to="{
          path: '/store/users/add',
        }"
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        primary
      >
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Создать</span>
      </router-link>
    </template>
    <template #floating>
      <a-link-floating-text primary to="/store/users/add"
        >Создать
      </a-link-floating-text>
    </template>
    <template v-if="isError" #error>
      {{ errorMessage }}
    </template>
    <a-list
      v-if="storeUsers"
      :items="storeUsers"
      description-field="phoneNumber"
      title-field="fullName"
      @on-item-click="onItemClick"
    ></a-list>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import AList from "@/components/ui/AList.vue"
import ALinkFloatingText from "@/components/ui/ALinkFloatingText.vue"
import { useSelect } from "@/composables/useSelect2.js"
import { useApiRequest } from "@/composables/useApiRequest"

const {
  serverData: storeUsers,
  sendRequest,
  isError,
  errorMessage,
} = useApiRequest()

const { isSelectableMode, applySelect } = useSelect()

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item)
  } else {
    // router.push(`/store/items/${item.id}`)
  }
}

onMounted(async () => {
  await sendRequest("get", "/store/users")

  // getStoreUsers()
})
</script>

<style lang="scss" scoped></style>
