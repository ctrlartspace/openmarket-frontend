<template>
  <a-page solid-floating :padding-floating="false">
    <div class="flex flex-col gap-2 pb-8">
      <v-form class="relative w-full" @submit.prevent="addCartItem">
        <input
          ref="focusableInput"
          v-model.trim="inputValue"
          type="text"
          class="block w-full text-ellipsis rounded-xl border border-neutral-100 bg-white px-4 py-2 pl-12 pr-20 font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 md:pl-12"
          :class="
            isSearchError
              ? 'animate-shake text-red-600 will-change-transform'
              : 'text-black'
          "
          placeholder="Наименование, код товара"
          @input="onSearchInput"
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center"
        >
          <span class="material-symbols-rounded pl-4 text-neutral-300"
            >search</span
          >
          <div class="pointer-events-auto ml-auto flex h-full px-2">
            <router-link
              to="/cart/favorite"
              v-if="!isSearchLoading"
              class="pointer-events-auto flex items-center rounded pl-2 md:hidden"
              v-press
            >
              <span class="material-symbols-rounded text-neutral-300"
                >star</span
              >
            </router-link>
            <router-link
              to="/cart/free"
              v-if="!isSearchLoading"
              class="pointer-events-auto flex items-center rounded px-2 md:hidden"
              v-press
            >
              <span class="material-symbols-rounded text-neutral-300"
                >apps</span
              >
            </router-link>

            <span v-else class="flex items-center px-2">
              <span class="material-symbols-rounded animate-spin"
                >progress_activity</span
              >
            </span>
          </div>
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
              <button
                class="flex h-full select-none items-center justify-center rounded-md bg-neutral-100 text-black hover:bg-neutral-200 hover:text-neutral-700 active:bg-neutral-200 active:text-neutral-700 md:rounded"
              >
                <span class="material-symbols-rounded"> add </span>
              </button>

              {{ item.storeItem.name }}
            </span>
          </template>
        </a-list>
      </div>
      <div
        v-if="!store.isEmpty"
        class="flex w-full flex-col overflow-hidden rounded-xl border border-neutral-100 bg-white"
      >
        <div
          v-for="(item, i) in store.groupedCartItems"
          :key="i"
          class="flex w-full cursor-pointer items-center border-b-4 border-neutral-50 bg-white last:border-none md:hover:bg-neutral-50 md:active:bg-neutral-100"
          @click="onItemClick(item)"
        >
          <div class="flex items-center">
            <button
              class="flex h-full select-none items-center justify-center rounded-md px-4 py-2"
              v-press
            >
              <span
                class="material-symbols-rounded rounded bg-red-100 text-red-600"
                @click.stop="store.removeItem(item)"
              >
                remove
              </span>
            </button>
          </div>
          <div class="w-full truncate py-2 font-medium">
            {{
              item?.storeItem?.name ||
              (item.comment || "") + " Свободная продажа"
            }}
          </div>
          <div class="w-max whitespace-nowrap px-2 pr-0">
            <span class="text-neutral-300">{{ item.count }} шт. </span>
            <span class="font-medium">
              {{ item.count * item.sellingPrice }}
            </span>
            <span class="font-semibold"> ₸ </span>
          </div>

          <div class="flex items-center">
            <button
              class="flex h-full select-none items-center justify-center rounded-md px-4 py-2 text-black"
              v-press
            >
              <span
                class="material-symbols-rounded rounded bg-neutral-100 text-black"
                @click.stop="store.addItem(item)"
              >
                add
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #floating>
      <cart-total-for-mobile v-if="!isDesktop" />
    </template>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import { getPointItem } from "@/services/PointService"
import CartTotalForMobile from "@/components/CartTotalForMobile.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useFocusable } from "@/composables/useFocusable"
import { watchDebounced } from "@vueuse/core"
import { useApiRequest } from "@/composables/useApiRequest"

const { focusableInput } = useFocusable()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

const store = useCartStore()
const router = useRouter()

const inputValue = ref("")
const isSearchError = ref(false)
const isSearchLoading = ref(false)
const freeItem = ref({ sellingPrice: "" })

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
  if (item.id) {
    router.push(`/point/items/${item.id}`)
  }
}

const onSearchItemClick = (item) => {
  store.addItem(item)
  inputValue.value = ""
  pointItems.value = null
}
</script>
