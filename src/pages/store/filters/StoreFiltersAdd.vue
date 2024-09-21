<template>
  <a-page title="Новый фильтр">
    <template #header>
      <a-button primary @click="addFilter">Сохранить</a-button>
    </template>
    <div class="flex flex-col gap-2">
      <div
        v-if="filters"
        class="px-4 py-2 border border-neutral-300 rounded-xl md:rounded bg-white"
      >
        Добавить в
        <span class="bg-blue-50 px-2 py-1 rounded text-blue-600">
          {{ filters }}
        </span>
      </div>
      <a-base-input
        id="filter-name"
        v-model="filterName"
        placeholder="Название"
        type="text"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointService from "@/services/PointService.js"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import AButton from "@/components/ui/AButton.vue"

const router = useRouter()
const filterName = ref("")
const { filters } = useFilters()

const addFilter = async () => {
  try {
    const data = {
      name: filterName.value,
      parentId: filters.value,
    }
    await PointService.addFilter(data)
    await router.push("/store/filters")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
