<template>
  <div>
    <template #header>
      <Button
        v-if="!isSelectableMode"
        as="router-link"
        fluid
        to="/point/items/import"
      >
        <span class="material-symbols-rounded">upload</span>
        <span class="font-medium">Импорт товаров</span>
      </Button>
      <Button
        v-if="!isSelectableMode"
        as="router-link"
        fluid
        to="/point/items/add"
      >
        <span class="material-symbols-rounded">add</span>
        <span class="font-medium">Создать товар</span>
      </Button>
    </template>
    <template #floating>
      <a-link-floating
        v-if="!isSelectableMode"
        :to="{ path: '/point/items/import' }"
        success
      >
        upload
      </a-link-floating>
      <a-link-floating :to="{ path: '/scan2', query: { scannableMode: true } }">
        center_focus_strong
      </a-link-floating>
      <a-link-floating
        v-if="!isSelectableMode"
        :to="{ path: '/point/items/add' }"
      >
        add
      </a-link-floating>
    </template>

    <div v-if="pointItems">
      <InputText
        ref="focusableInput"
        v-model.trim="searchInput"
        class="mb-4"
        fluid
        placeholder="Наименование"
        type="text"
      />
      <a-list
        :items="pointItems"
        description-field="count"
        description-hint="шт."
        title-field="name"
        @on-item-click="onItemClick"
      />
    </div>
    <!-- Отладочная информация -->
    <div v-if="isPointItemsFetching" class="text-red-500">Loading...</div>
  </div>
</template>

<script setup>
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AList from "@/components/ui/AList.vue"
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useSelect } from "@/composables/useSelect2.js"
import { useScan } from "@/composables/useScan"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import { useApiRequest } from "@/composables/useApiRequest"

const { focusableInput } = useFocusable()
const router = useRouter()
const { isSelectableMode, applySelect } = useSelect()
const { scannedCode } = useScan()
const searchInput = ref("")
const {
  serverData: pointItems,
  sendRequest: fetchPointItems,
  isLoading: isPointItemsFetching,
} = useApiRequest()

const getPointItems = async () => {
  await fetchPointItems("get", "/point/items", { q: searchInput.value })
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item)
  } else {
    router.push(`/point/items/${item.id}`)
  }
}

watchDebounced(searchInput, getPointItems, { debounce: 500, maxWait: 1000 })

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) searchInput.value = newScannedCode
})

onMounted(getPointItems)

// Предоставляем значение для лоадера
defineExpose({
  loading: isPointItemsFetching,
})
</script>

<style lang="scss" scoped></style>
