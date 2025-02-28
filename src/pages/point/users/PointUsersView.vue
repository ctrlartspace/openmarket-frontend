<template>
  <a-page :loading="isPointUsersFetching" title="Сотрудники">
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>

      <Button as="router-link" fluid to="/point/users/add">
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Добавить</span>
      </Button>
    </template>
    <template #floating>
      <a-link-floating primary to="/point/users/add">add</a-link-floating>
    </template>
    <a-list
      v-if="pointUsers"
      :items="pointUsers"
      description-field="phoneNumber"
      title-field="fullName"
    ></a-list>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import AList from "@/components/ui/AList.vue"
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
