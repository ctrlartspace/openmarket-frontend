<template>
  <a-page :loading="isLoading" title="Поступления">
    <template v-if="store.hasPermission('create_arrival')" #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>

      <Button
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
        as="router-link"
        fluid
      >
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium"> Создать</span>
      </Button>
    </template>
    <template v-if="store.hasPermission('create_arrival')" #floating>
      <a-link-floating
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
        primary
      >
        add
      </a-link-floating>
    </template>

    <a-list
      v-if="pointItems"
      :items="pointItems"
      description-field="count"
      description-hint="шт."
      title-field="pointItem.name"
      @on-item-click="onItemClick"
    >
    </a-list>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"
import { useUserStore } from "@/stores/user.store.js"

const router = useRouter()
const { serverData: pointItems, sendRequest, isLoading } = useApiRequest()
const store = useUserStore()

const onItemClick = (item) => {
  router.push(`/point/items/${item.pointItem.id}`)
}

onMounted(async () => {
  await sendRequest("get", "/point/arrivals")
})
</script>

<style lang="scss" scoped></style>
