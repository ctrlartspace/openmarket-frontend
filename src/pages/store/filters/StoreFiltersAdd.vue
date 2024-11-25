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
        <a-button-floating v-bind="props">save</a-button-floating>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <div
        v-if="filters"
        class="rounded-xl border border-neutral-100 bg-white px-4 py-2"
      >
        Добавить в
        <span class="rounded bg-blue-50 px-2 py-1 font-medium text-blue-600">
          {{ filters }}
        </span>
      </div>
      <a-base-input
        id="filter-name"
        v-model="filterName"
        placeholder="Название"
        type="text"
        :is-error="validationErrors.name"
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const filterName = ref("")
const { filters } = useFilters()
const { sendRequest, validationErrors } = useApiRequest()

const addFilter = async () => {
  const data = {
    name: filterName.value,
    parentId: filters.value,
  }
  const response = await sendRequest("post", "/filters", data)
  if (response) {
    await router.push("/store/filters")
  }
}
</script>

<style lang="scss" scoped></style>
