<template>
  <a-page :loading="isActiveCashLoading">
    <template v-if="!isActiveCashExists && !isActiveCashLoading" #header>
      <a-link primary to="/cash-register/active/add"> Открыть смену </a-link>
    </template>
    <div v-if="isActiveCashExists" class="flex flex-col gap-2 pb-8">
      <v-form class="relative w-full" @submit.prevent="addCartItem">
        <input
          ref="focusableInput"
          v-model.trim="inputValue"
          type="text"
          class="block w-full text-ellipsis rounded-xl border border-neutral-300 bg-white px-4 py-2 pl-12 pr-12 text-lg font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 md:border-neutral-200 md:text-base"
          :class="
            isSearchError
              ? 'animate-shake text-red-600 will-change-transform'
              : 'text-black'
          "
          placeholder="Код товара, наименование"
          @input="onSearchInput"
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center px-4"
        >
          <span class="material-symbols-rounded text-neutral-300">search</span>
          <router-link
            to="/cart/favorite"
            v-if="!isSearchLoading"
            class="pointer-events-auto ml-auto flex items-center"
            v-press
          >
            <span class="material-symbols-rounded text-neutral-400">star</span>
          </router-link>
          <span v-else class="material-symbols-rounded ml-auto animate-spin"
            >progress_activity</span
          >
        </div>
      </v-form>
      <div v-if="pointItems && inputValue.length > 0">
        <a-list
          :items="pointItems"
          title-field="storeItem.name"
          description-field="sellingPrice"
          description-hint="₸"
          @on-item-click="onSearchItemClick"
        >
          <template #title="{ item }">
            <span class="flex items-center gap-2">
              <span class="material-symbols-rounded text-neutral-300"
                >add
              </span>
              {{ item.storeItem.name }}
            </span>
          </template>
        </a-list>
      </div>
      <div
        v-if="!store.isEmpty"
        class="flex w-full flex-col overflow-hidden rounded-xl border border-neutral-300 bg-white md:border-neutral-200"
      >
        <div
          v-for="(item, i) in store.groupedCartItems"
          :key="i"
          class="flex w-full cursor-pointer items-center border-b border-neutral-300 bg-white text-lg last:border-none hover:bg-neutral-50 active:bg-neutral-100 md:border-neutral-200 md:text-base"
          @click="onItemClick(item)"
        >
          <div class="flex items-center py-2 pl-4">
            <button class="flex items-center justify-center" v-press>
              <span
                class="material-symbols-rounded select-none rounded bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 active:bg-red-200 active:text-red-700"
                @click.stop="store.removeItem(item.id)"
              >
                remove
              </span>
            </button>
          </div>
          <div class="w-full truncate px-2 py-2 pl-4 font-medium">
            {{ item.storeItem.name }}
          </div>
          <div class="w-max whitespace-nowrap px-2">
            <span class="text-neutral-400">{{ item.count }} шт. </span>
            <span class="hidden font-medium text-green-600 md:inline">
              {{ item.count * item.sellingPrice }}
            </span>
            <span class="hidden font-semibold text-green-600 md:inline">
              ₸
            </span>
          </div>

          <div class="flex items-center py-2 pr-4">
            <button class="flex items-center justify-center" v-press>
              <span
                class="material-symbols-rounded select-none rounded bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 active:bg-green-200 active:text-green-700"
                @click.stop="store.addItem(item)"
              >
                add
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center p-4 text-lg text-neutral-300">
        Пусто
      </div>
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <div
        v-if="!isActiveCashLoading"
        class="flex flex-col items-center justify-center rounded-xl p-4"
      >
        <span class="text-lg text-neutral-300 md:text-base"
          >Смена не найдена</span
        >
      </div>
    </div>

    <template #floating>
      <cart-total-for-mobile v-if="!isDesktop" />
      <a-link-floating-text
        v-if="!isActiveCashExists && !isActiveCashLoading"
        primary
        to="/cash-register/active/add"
      >
        Открыть смену
      </a-link-floating-text>
    </template>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getPointItem } from "@/services/PointService"
import CartTotalForMobile from "@/components/CartTotalForMobile.vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import { useApiRequest } from "@/composables/useApiRequest"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloatingText from "@/components/ui/ALinkFloatingText.vue"

const { focusableInput } = useFocusable()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

const store = useCartStore()
const router = useRouter()

const inputValue = ref("")
const isSearchError = ref(false)
const isSearchLoading = ref(false)

const addCartItem = async () => {
  isSearchError.value = false
  if (!inputValue.value) {
    return
  }

  try {
    isSearchLoading.value = true
    const item = await getPointItem(inputValue.value, { searchBy: "code" })
    store.addItem(item)
    inputValue.value = ""
    isSearchError.value = false
  } catch (error) {
    isSearchError.value = true
    console.error(error)
  } finally {
    isSearchLoading.value = false
  }
}

const onSearchInput = () => {
  isSearchError.value = false
}

const {
  serverData: pointItems,
  sendRequest: fetchPointItems,
  isLoading: isPointItemsFetching,
} = useApiRequest()

const getPointItems = async () => {
  isSearchLoading.value = true
  await fetchPointItems("get", "/point/items", {
    q: inputValue.value,
  })
  isSearchLoading.value = false
}

watchDebounced(
  inputValue,
  async () => {
    if (inputValue.value.length > 0) {
      await getPointItems()
    } else {
      pointItems.value = null
    }
  },
  { debounce: 500, maxWait: 1000 },
)

const onItemClick = (item) => {
  router.push(`/point/items/${item.id}`)
}

const onSearchItemClick = (item) => {
  store.addItem(item)
  inputValue.value = ""
  pointItems.value = null
}

const {
  serverData: activeCash,
  sendRequest: fetchActiveCash,
  isLoading: isActiveCashLoading,
} = useApiRequest()

const isActiveCashExists = computed(
  () => !!(activeCash.value && activeCash.value.id),
)

onMounted(async () => {
  await fetchActiveCash("get", "/cash-registers/today")
})
</script>
