<template>
  <a-page title="Фильтры">
    <template #header>

      <router-link
        v-if="!isFilterMode"
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
        @click="applyFilters"
      >
        Готово
      </button>
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

const { filters, filterPathAdd, isSingle, isFilterMode, applyFilters, resetFilters, filterItems } = useFilters()

</script>

<style lang="scss" scoped></style>
