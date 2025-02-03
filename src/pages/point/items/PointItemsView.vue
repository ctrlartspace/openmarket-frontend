<template>
  <a-page
    :loading="isPointItemsFetching"
    :title="isSelectableMode ? 'Выбрать...' : ''"
  >
    <template #header>
      <a-link
        :to="{
          path: '/point/items/import',
        }"
        success
        >Импорт товаров
      </a-link>
      <a-link
        v-if="!isSelectableMode"
        :to="{
          path: '/point/items/add',
        }"
        primary
        >Добавить
      </a-link>
    </template>
    <template #floating>
      <a-link-floating
        :to="{
          path: '/point/items/import',
        }"
        success
        >upload
      </a-link-floating>
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
        :to="{
          path: '/point/items/add',
        }"
        primary
        >add
      </a-link-floating>
    </template>

    <div v-if="pointItems">
      <v-form class="relative mb-4 w-full" @submit.prevent>
        <input
          ref="focusableInput"
          v-model.trim="searchInput"
          class="block w-full text-ellipsis rounded-xl border border-gray-100 bg-white px-4 py-3 pl-12 font-medium outline-black placeholder:font-normal placeholder:text-gray-300"
          placeholder="Код товара, наименование"
          type="text"
        />
        <div
          class="absolute bottom-0 left-0 top-0 flex items-center justify-between px-4"
        >
          <span class="material-symbols-rounded text-gray-300">search</span>
        </div>
      </v-form>

      <a-list
        :items="pointItems"
        description-field="count"
        description-hint="шт."
        title-field="name"
        @on-item-click="onItemClick"
      >
      </a-list>
    </div>
  </a-page>
</template>

<script setup>
import ALink from "@/components/ui/ALink.vue"
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
  await fetchPointItems("get", "/point/items", {
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
