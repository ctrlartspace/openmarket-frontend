<template>
  <a-page :loading="isPointUsersFetching">
    <template #header>
      <a-link primary to="/point/users/add">Добавить </a-link>
    </template>
    <template #floating>
      <a-link-floating primary to="/point/users/add">add </a-link-floating>
    </template>
    <a-list
      v-if="pointUsers"
      :items="pointUsers"
      title-field="fullName"
      description-field="phoneNumber"
    ></a-list>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import AList from "@/components/ui/AList.vue"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const {
  serverData: pointUsers,
  sendRequest: fetchPointUsers,
  isLoading: isPointUsersFetching,
} = useApiRequest()

onMounted(async () => {
  await fetchPointUsers("get", "/point/users")
})
</script>

<style lang="scss" scoped></style>
