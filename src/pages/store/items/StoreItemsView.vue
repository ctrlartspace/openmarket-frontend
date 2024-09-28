<template>
  <a-page :title="isSelectableMode ? 'Выбрать...' : ''">
    <template #header>
      <a-link v-if="!isSelectableMode" primary to="/store/items/add"
        >Добавить
      </a-link>
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
        <span class="material-icons text-gray-300">search</span>
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
          <span class="material-icons-outlined">center_focus_strong</span>
        </router-link>
      </div>
    </v-form>
    <data-table
      :table-data="storeItems"
      :table-fields="tableFields"
      @on-item-click="onItemClick"
    >
    </data-table>
  </a-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import StoreService from "@/services/StoreService"
import DataTable from "@/components/ui/DataTable.vue"
import { useSelect } from "@/composables/useSelect2.js"
import { useScan } from "@/composables/useScan"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import ALink from "@/components/ui/ALink.vue"

const { focusableInput } = useFocusable()
const router = useRouter()
const storeItems = ref([])
const { isSelectableMode, applySelect } = useSelect()
const { scannedCode } = useScan()
const searchInput = ref("")

const getStoreItems = async () => {
  try {
    storeItems.value = await StoreService.getStoreItems({
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
const tableFields = ref([
  {
    name: "name",
    className: "w-full",
  },
  {
    name: "purchasePrice",
    className: "whitespace-nowrap text-right",
    postfix: " KZT",
  },
])
</script>

<style lang="scss" scoped></style>
