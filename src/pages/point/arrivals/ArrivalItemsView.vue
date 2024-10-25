<template>
  <a-page :loading="isLoading">
    <template #header>
      <a-link :to="filterPathMulti" primary>
        <span class="material-symbols-outlined text-[28px]">menu</span>
      </a-link>
      <a-link
        primary
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
      >
        Добавить</a-link
      >
    </template>
    <template #floating>
      <a-link-floating :to="filterPathMulti"> page_info </a-link-floating>
      <a-link-floating
        primary
        :to="{
          path: '/point/items',
          query: { selectableMode: true, nextPath: '/point/arrivals/add' },
        }"
      >
        add</a-link-floating
      >
    </template>

    <a-list
      v-if="pointItems"
      :items="pointItems"
      title-field="pointItem.storeItem.name"
      description-field="count"
      description-hint="шт."
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
import { useFilters } from "@/composables/filters.js"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const { filterPathMulti, joinedFilters } = useFilters()
const { serverData: pointItems, sendRequest, isLoading } = useApiRequest()

const onItemClick = (item) => {
  router.push(`/point/items/${item.pointItem.id}`)
}

onMounted(async () => {
  await sendRequest("get", "/arrivals", {
    filters: joinedFilters.value,
  })
})
</script>

<style lang="scss" scoped></style>
