<template>
  <a-page
    :title="isSelectableMode ? 'Выбрать...' : ''"
    :loading="isStoreItemsFetching"
  >
    <template #header>
      <a-button
        v-if="selectedItems.length > 0 && point"
        accent
        @click="onAddItemsToPointClick"
        >Добавить в точку
      </a-button>
      <a-link v-if="!isSelectableMode" primary to="/store/items/add"
        >Добавить
      </a-link>
    </template>

    <template #floating>
      <a-modal
        v-if="selectedItems.length > 0 && point"
        #="{ props }"
        title="Добавить товары в точку?"
        :async-operation="onAddItemsToPointClick"
      >
        <a-button-floating accent v-bind="props">add_circle </a-button-floating>
      </a-modal>
      <a-link-floating
        :to="{
          path: '/scan2',
          query: { scannableMode: true },
        }"
      >
        center_focus_strong
      </a-link-floating>
      <a-link-floating v-if="!isSelectableMode" primary to="/store/items/add"
        >add
      </a-link-floating>
    </template>
    <div v-if="storeItems">
      <v-form class="relative mb-2 w-full" @submit.prevent>
        <input
          ref="focusableInput"
          v-model.trim="searchInput"
          type="text"
          class="block w-full text-ellipsis rounded-xl border border-neutral-300 bg-white px-4 py-2 pl-12 text-lg font-medium outline-black placeholder:font-normal placeholder:text-neutral-300 md:border-neutral-200 md:text-base"
          placeholder="Код товара, наименование"
        />
        <div
          class="absolute bottom-0 left-0 top-0 flex items-center justify-between px-4"
        >
          <span class="material-symbols-rounded text-gray-300">search</span>
        </div>
        <!-- <div
        class="absolute bottom-0 right-0 top-0 flex items-center justify-between px-4"
      >
      </div> -->
      </v-form>
      <router-link
        v-if="isSelectableMode"
        :to="{
          path: '/store/items/add',
          query: { scannedCode: searchInput },
        }"
        class="mb-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-center text-lg font-medium text-blue-600 md:border-neutral-200 md:text-base"
        >Создать новый товар
      </router-link>

      <a-list
        v-model="selectedItems"
        :items="storeItems"
        title-field="name"
        description-field="purchasePrice"
        description-hint="₸"
        @on-item-click="onItemClick"
        :selectable="point"
      >
      </a-list>
      <div v-if="storeItems && storeItems.length === 0 && isSelectableMode">
        <h1 class="p-4 text-center text-neutral-300">Не найдено</h1>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useSelect } from "@/composables/useSelect2.js"
import { useScan } from "@/composables/useScan"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AList from "@/components/ui/AList.vue"
import AModal from "@/components/ui/AModal.vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { useUserStore } from "@/stores/user.store"

const {
  serverData: storeItems,
  sendRequest: fetchStoreItems,
  isLoading: isStoreItemsFetching,
} = useApiRequest()
const { sendRequest: addItemsToPoint } = useApiRequest()

const { point } = useUserStore()
const { focusableInput } = useFocusable()
const router = useRouter()
const { isSelectableMode, applySelect } = useSelect()
const { scannedCode } = useScan()
const searchInput = ref("")
const selectedItems = ref([])

const onFetchStoreItems = async () => {
  await fetchStoreItems("get", "/store/items", { q: searchInput.value })
}

const onAddItemsToPointClick = async () => {
  const data = selectedItems.value.map((item) => ({ storeItemId: item }))
  const response = await addItemsToPoint("post", "/point/items/many", data)
  if (response) {
    selectedItems.value = []
  }
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item)
  } else {
    router.push(`/store/items/${item.id}`)
  }
}

watchDebounced(
  searchInput,
  async () => {
    await onFetchStoreItems()
  },
  { debounce: 500, maxWait: 1000 },
)

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    searchInput.value = newScannedCode
  }
})

onMounted(async () => {
  await onFetchStoreItems()
})
</script>

<style lang="scss" scoped></style>
