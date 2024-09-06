<template>
  <a-page title="Категории">
    <template #header>
      <a-link v-if="!isFilterMode" :to="filterPathAdd" primary>
        {{ filters ? `Добавить в "${filters}"` : "Добавить" }}
      </a-link>
      <a-button v-if="isFilterMode" neutral @click="resetFilters">
        Сброс
      </a-button>
      <a-button v-if="isFilterMode" primary @click="applyFilters">
        Применить
      </a-button>
    </template>
    <div class="flex flex-col gap-2">
      <filter-tree
        v-model="filters"
        :items="filterItems"
        :single="isSingle"
        nested="true"
        select-root="true"
      />
    </div>
  </a-page>
</template>

<script setup>
import FilterTree from "@/components/FilterTree.vue"
import { useFilters } from "@/composables/filters.js"
import ALink from "@/components/ui/ALink.vue"
import AButton from "@/components/ui/AButton.vue"

const {
  filters,
  filterPathAdd,
  isSingle,
  isFilterMode,
  applyFilters,
  resetFilters,
  filterItems,
} = useFilters()
</script>

<style lang="scss" scoped></style>
