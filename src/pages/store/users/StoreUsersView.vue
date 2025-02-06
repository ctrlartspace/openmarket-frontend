<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/users/add">Добавить</a-link>
    </template>
    <template #floating>
      <a-link-floating-text primary to="/store/users/add"
        >Добавить
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
import ALink from "@/components/ui/ALink.vue"
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
