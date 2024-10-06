<template>
  <a-page :title="isSelectableMode ? 'Выбрать...' : ''">
    <template #header>
      <a-button v-if="selectedItems.length > 0" accent @click="addPointItems"
        >Добавить в точку
      </a-button>
      <a-link v-if="!isSelectableMode" primary to="/store/items/add"
        >Добавить
      </a-link>
    </template>
    <template #floating>
      <a-button-floating
        v-if="selectedItems.length > 0"
        accent
        @click="addPointItems"
        >add_circle
      </a-button-floating>
      <a-link-floating v-if="!isSelectableMode" primary to="/store/items/add"
        >add
      </a-link-floating>
    </template>
    <v-form class="relative mb-2 w-full" @submit.prevent>
      <input
        ref="focusableInput"
        v-model.trim="searchInput"
        type="text"
        class="block w-full text-ellipsis rounded-xl border border-neutral-300 bg-white px-4 py-2 pl-12 pr-12 text-lg font-medium outline-black placeholder:font-normal placeholder:text-gray-300 md:rounded-lg md:text-base"
        placeholder="Код товара, наименование"
      />
      <div
        class="absolute bottom-0 left-0 top-0 flex items-center justify-between px-4"
      >
        <span class="material-symbols-outlined text-gray-300">search</span>
      </div>
      <div
        class="absolute bottom-0 right-0 top-0 flex items-center justify-between px-4"
      >
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
    <a-list
      v-model="selectedItems"
      :items="storeItems"
      title-field="name"
      description-field="purchasePrice"
      description-hint="₸"
      @on-item-click="onItemClick"
      selectable
    >
    </a-list>
  </a-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import StoreService from "@/services/StoreService"
import { useSelect } from "@/composables/useSelect2.js"
import { useScan } from "@/composables/useScan"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import PointService from "@/services/PointService"
import AList from "@/components/ui/AList.vue"

const { focusableInput } = useFocusable()
const router = useRouter()
const storeItems = ref([])
const { isSelectableMode, applySelect } = useSelect()
const { scannedCode } = useScan()
const searchInput = ref("")
const selectedItems = ref([])

const getStoreItems = async () => {
  try {
    storeItems.value = await StoreService.getStoreItems({
      q: searchInput.value,
    })
  } catch (error) {
    console.log(error)
  }
}

const addPointItems = async () => {
  try {
    const data = selectedItems.value.map((item) => ({ storeItemId: item }))
    await PointService.addItemsMany(data)
    selectedItems.value = []
  } catch (error) {
    console.log(error)
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
    await getStoreItems()
  },
  { debounce: 500, maxWait: 1000 },
)

watch(scannedCode, (newScannedCode) => {
  if (newScannedCode) {
    searchInput.value = newScannedCode
  }
})

onMounted(() => {
  getStoreItems()
})
</script>

<style lang="scss" scoped></style>
