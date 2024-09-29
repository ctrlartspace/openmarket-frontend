<template>
  <a-page :title="isSelectableMode ? 'Выбрать...' : ''">
    <template #header>
      <a-link :to="filterPathMulti" primary>
        <span class="material-symbols-outlined text-[28px]">menu</span>
      </a-link>
      <a-link v-if="!isSelectableMode" primary to="/point/items/add"
        >Добавить
      </a-link>
    </template>
    <template #floating>
      <a-link-floating v-if="!isSelectableMode" primary to="/point/items/add"
        >add
      </a-link-floating>
    </template>

    <v-form class="relative mb-2 w-full" @submit.prevent>
      <input
        ref="focusableInput"
        v-model.trim="searchInput"
        type="text"
        class="block w-full text-ellipsis rounded-xl border border-neutral-300 bg-white px-4 py-2 pl-12 pr-20 text-lg font-medium outline-black placeholder:font-normal placeholder:text-gray-300 md:rounded-lg md:text-base"
        placeholder="Код товара, наименование"
      />
      <div
        class="absolute bottom-0 left-0 top-0 flex items-center justify-between px-4"
      >
        <span class="material-symbols-outlined text-gray-300">search</span>
      </div>
      <div
        class="absolute bottom-0 right-0 top-0 flex items-center justify-between gap-2 px-4"
      >
        <router-link :to="filterPathMulti" class="flex items-center">
          <span class="material-symbols-outlined">page_info</span>
        </router-link>
        <router-link
          :to="{
            path: '/scan2',
            query: { scannableMode: true },
          }"
          class="flex items-center"
        >
          <span class="material-symbols-outlined">center_focus_strong</span>
        </router-link>
      </div>
    </v-form>

    <data-table
      :table-data="pointItems"
      :table-fields="tableFields"
      @on-item-click="onItemClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import PointService from "@/services/PointService.js"
import DataTable from "@/components/ui/DataTable.vue"
import { useFilters } from "@/composables/filters.js"
import { useSelect } from "@/composables/useSelect2.js"
import { useScan } from "@/composables/useScan"
import { useFocusable } from "@/composables/useFocusable"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { watchDebounced } from "@vueuse/core"

const { focusableInput } = useFocusable()
const router = useRouter()
const pointItems = ref([])
const { filters, filterPathMulti, selectedFiltersLength, joinedFilters } =
  useFilters()
const { isSelectableMode, applySelect } = useSelect()
const { scannedCode } = useScan()
const searchInput = ref("")

const getPointItems = async () => {
  try {
    pointItems.value = await PointService.getPointItems({
      filters: joinedFilters.value,
      q: searchInput.value,
    })
  } catch (error) {
    console.log(error)
  }
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

const tableFields = ref([
  {
    name: "storeItem.name",
    className: "w-full",
  },
  { name: "count", className: "whitespace-nowrap text-right", postfix: " шт" },
])
</script>

<style lang="scss" scoped></style>
