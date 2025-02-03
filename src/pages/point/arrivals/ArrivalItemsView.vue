<template>
  <a-page :loading="isLoading">
    <template #header>
      <a-link
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
        primary
      >
        Добавить
      </a-link>
    </template>
    <template #floating>
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
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const { serverData: pointItems, sendRequest, isLoading } = useApiRequest()

const onItemClick = (item) => {
  router.push(`/point/items/${item.pointItem.id}`)
}

onMounted(async () => {
  await sendRequest("get", "/point/arrivals")
})
</script>

<style lang="scss" scoped></style>
