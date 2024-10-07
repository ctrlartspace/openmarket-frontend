<template>
  <a-page title="Новая категория">
    <template #header>
      <a-modal
        #="{ props }"
        title="Добавить категорию?"
        :async-operation="addFilter"
      >
        <a-button primary v-bind="props">Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Добавить категорию?"
        :async-operation="addFilter"
      >
        <a-button-floating primary v-bind="props">save</a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <div
        v-if="filters"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-lg md:rounded-lg md:text-base"
      >
        Добавить в
        <span
          class="rounded bg-blue-50 px-2 py-1 text-lg font-medium text-blue-600 md:text-base"
        >
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
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"

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
