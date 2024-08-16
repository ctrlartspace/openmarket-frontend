<template>
  <a-page title="Новый фильтр">
    <template #header>
      <button
        class="text-base font-medium text-blue-600"
        @click="addFilter"
      >
        Сохранить
      </button>
    </template>
    <div class="flex flex-col gap-2 ">
      <div
        v-if="filters"
        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100 "
      >
        Добавить в {{ filters }}
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

const router = useRouter()
const filterName = ref("")
const { filters } = useFilters()

const addFilter = async () => {
  try {
    const data = {
      name: filterName.value,
      parentId: filters.value
    }
    await PointService.addFilter(data)

    router.push("/point/filters")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
