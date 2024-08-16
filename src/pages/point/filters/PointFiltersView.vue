<template>
  <a-page title="Фильтры">
    <template #header>

      <router-link
        v-if="!isFilterMode  "
        :to="filterPathAdd"
        class="text-base font-medium text-blue-600"
      >
        {{ filters ? `Добавить в "${filters}"` : "Добавить" }}
      </router-link>
      <button
        v-if="isFilterMode"
        class="text-base font-medium text-neutral-300 hover:text-black"
        @click="resetFilters"
      >
        Сброс
      </button>
      <button
        v-if="isFilterMode"
        class="text-base font-medium text-blue-600"
        @click="onApplyClick"
      >
        Готово
      </button>
    </template>
    <div class="flex flex-col gap-2">
      <filter-tree
        v-model="filters"
        :items="filterItems"
        :single="isSingle"
        class="border border-neutral-300 rounded overflow-auto"
        nested="true"
        select-root="true"
      />
    </div>
  </a-page>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import FilterTree from "@/components/FilterTree.vue"
import { getPointFilters } from "@/services/point/filters.js"
import { useFilters } from "@/composables/filters.js"
import { useRouteStore } from "@/stores/route.store"

const routeStore = useRouteStore()
const route = useRoute()
const router = useRouter()
const filterItems = ref([])
const { filters, filterPathAdd, isSingle } = useFilters()
const isFilterMode = ref(false)

const onApplyClick = () => {
  try {
    const previousRoute = routeStore.previousRoute
    const rawFilters = JSON.stringify(filters.value)
    const routeOptions = {
      name: previousRoute.name,
      params: previousRoute.params,
      replace: true
    }
    if (rawFilters) {
      routeOptions.query = { filters: rawFilters }
    }
    router.push(routeOptions)
  } catch (error) {
    console.log(error)
  }
}

const resetFilters = () => {
  filters.value = undefined
}

onMounted(async () => {
  isFilterMode.value = !!route.query.filterMode
  filterItems.value = await getPointFilters()
})
onUpdated(() => {
  filters.value = undefined
  isFilterMode.value = !!route.query.filterMode
})
</script>

<style lang="scss" scoped></style>
