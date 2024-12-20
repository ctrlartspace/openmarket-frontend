<template>
  <a-page :title="isFilterMode ? 'Выбрать...' : 'Категории'">
    <template #header>
      <a-link v-if="!isFilterMode" :to="filterPathAdd" primary>
        {{ filters ? `Добавить в "${filters}"` : "Добавить" }}
      </a-link>
      <!-- <a-button v-if="isFilterMode" gray @click="resetFilters">
        Сброс
      </a-button> -->
      <a-button v-if="isFilterMode" primary @click="applyFilters">
        Применить
      </a-button>
    </template>

    <template #floating>
      <a-link-floating v-if="!isFilterMode" :to="filterPathAdd" primary>
        add
      </a-link-floating>
      <a-button-floating v-if="isFilterMode" primary @click="applyFilters">
        arrow_forward
      </a-button-floating>
    </template>
    <div v-if="filterItems" class="flex flex-col gap-2">
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
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"

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
