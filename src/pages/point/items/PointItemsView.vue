<template>
  <a-page :title="isSelectableMode ? 'Выбрать...' : ''">
    <template #header>
      <a-link :to="filterPathMulti" primary> Категории </a-link>
      <a-link v-if="!isSelectableMode" primary to="/point/items/add"
        >Добавить
      </a-link>
    </template>
    <template #floating>
      <a-link-floating :to="filterPathMulti"> page_info </a-link-floating>
      <a-link-floating
        :to="{
          path: '/scan2',
          query: { scannableMode: true },
        }"
      >
        center_focus_strong
      </a-link-floating>
      <a-link-floating
        v-if="!isSelectableMode"
        primary
        :to="{
          path: '/store/items',
          query: { selectableMode: true, nextPath: '/point/items/add' },
        }"
        >add
      </a-link-floating>
    </template>

    <v-form class="relative mb-2 w-full" @submit.prevent>
      <input
        ref="focusableInput"
        v-model.trim="searchInput"
        type="text"
        class="block w-full text-ellipsis rounded-xl border border-neutral-300 bg-white px-4 py-2 pl-12 text-lg font-medium outline-black placeholder:font-normal placeholder:text-neutral-300 md:rounded-lg md:text-base"
        placeholder="Код товара, наименование"
      />
      <div
        class="absolute bottom-0 left-0 top-0 flex items-center justify-between px-4"
      >
        <span class="material-symbols-outlined text-gray-300">search</span>
      </div>
      <!-- <div
        class="absolute bottom-0 right-0 top-0 flex items-center justify-between gap-2 px-4"
      >
      </div> -->
    </v-form>

    <a-list
      v-if="pointItems"
      :items="pointItems"
      title-field="storeItem.name"
      description-field="count"
      description-hint="шт."
      @on-item-click="onItemClick"
    >
    </a-list>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AList from "@/components/ui/AList.vue"
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useFilters } from "@/composables/filters.js"
import { useSelect } from "@/composables/useSelect2.js"
import { useScan } from "@/composables/useScan"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import { useApiRequest } from "@/composables/useApiRequest"

const { focusableInput } = useFocusable()
const router = useRouter()
const { filterPathMulti, joinedFilters } = useFilters()
const { isSelectableMode, applySelect } = useSelect()
const { scannedCode } = useScan()
const searchInput = ref("")
const { serverData: pointItems, sendRequest: fetchPointItems } = useApiRequest()

const getPointItems = async () => {
  await fetchPointItems("get", "/point/items", {
    filters: joinedFilters.value,
    q: searchInput.value,
  })
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item)
  } else {
    router.push(`/point/items/${item.id}`)
  }
}

watchDebounced(
  searchInput,
  async () => {
    await getPointItems()
  },
  { debounce: 500, maxWait: 1000 },
)

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    searchInput.value = newScannedCode
  }
})

onMounted(() => {
  getPointItems()
})
</script>

<style lang="scss" scoped></style>
