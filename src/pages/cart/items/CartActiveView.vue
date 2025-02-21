<template>
  <a-page :padding-floating="false" solid-floating>
    <template #header>
      <router-link
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        primary
        to="/cart/favorite"
      >
        <span class="material-symbols-rounded">star</span>
        <span class="font-medium"> Быстрые товары</span>
      </router-link>

      <router-link
        class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"
        primary
        to="/cart/free"
      >
        <span class="material-symbols-rounded">apps</span>
        <span class="font-medium"> Свободная продажа</span>
      </router-link>

      <div v-if="isSearchError">
        <div
          :class="
            isSearchError
              ? 'animate-shake text-red-600 will-change-transform'
              : 'text-black'
          "
          class="mt-4 flex w-full flex-col justify-between text-ellipsis rounded-xl border border-gray-100 bg-white px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0"
        >
          <div class="rounded-xl bg-red-50 p-4">
            <p class="flex items-center gap-2">
              <span class="material-symbols-rounded">barcode_scanner</span
              >{{ notFountInputValue }}
            </p>
            <span class="text-sm font-normal">Штрихкод не найден</span>
          </div>
          <cart-item-dialog
            #="{ props }"
            :code="notFountInputValue"
            @success="onNewItemCreated"
          >
            <button
              class="mt-2 flex justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-600"
              v-bind="props"
            >
              <span class="material-symbols-rounded">add_shopping_cart</span>
              <span class="font-medium"> Создать </span>
            </button>
          </cart-item-dialog>
        </div>
      </div>
    </template>
    <v-form v-if="isDesktop || inputIsFocused" @submit.prevent="addCartItem">
      <input
        ref="focusableInput"
        v-model.trim="inputValue"
        class="mb-2 w-full text-ellipsis rounded-xl border border-gray-100 bg-white px-4 py-3 font-medium placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0"
        placeholder="Наименование"
        type="text"
        @blur="unsetFocusFromInput"
        @input="onSearchInput"
      />
    </v-form>
    <div class="no-scrollbar flex h-full flex-col gap-2 pb-28 md:pb-0">
      <div
        v-if="!isSearchError && pointItems && inputValue.length > 0"
        class=""
      >
        <p class="mb-2 px-4 text-gray-300">Выберите товар</p>

        <a-list
          :items="pointItems"
          description-field="sellingPrice"
          description-hint="₸"
          title-field="name"
          @on-item-click="onSearchItemClick"
        >
          <template #title="{ item }">
            <span class="flex items-center gap-2">
              {{ item.name }}
            </span>
          </template>
          <template #description="{ item }">
            <span>
              {{ item.sellingPrice }}
              <span class="font-semibold">₸</span>
            </span>
          </template>
        </a-list>
      </div>
      <div
        v-if="!store.isEmpty && inputValue.length === 0"
        class="flex w-full flex-col overflow-auto rounded-xl border border-gray-100 bg-white"
      >
        <div
          v-for="(item, i) in store.groupedCartItems"
          :key="i"
          class="flex w-full cursor-pointer items-center border-b border-gray-100 bg-white last:border-none md:hover:bg-gray-50/50"
          @click="onItemClick(item)"
        >
          <div class="flex items-center">
            <button
              v-press
              class="flex h-full select-none items-center justify-center rounded-xl px-4 py-3"
              @click.stop="store.removeItem(item)"
            >
              <span
                class="material-symbols-rounded rounded-full bg-red-50 text-red-600"
              >
                remove
              </span>
            </button>
          </div>
          <div class="w-full truncate py-3 font-medium">
            <span v-if="item.name">{{ item.name }}</span>

            <span v-else
              >{{ item.comment }}
              <span class="rounded text-yellow-500"
                >Свободная продажа</span
              ></span
            >
          </div>
          <div
            :class="{ 'text-rose-500': item.discount }"
            class="w-max whitespace-nowrap px-2 pr-0"
          >
            <span class="text-gray-300">{{ item.count }} шт. </span>
            <span class="font-medium">
              {{ formatMoney(item.totalPrice) }}
            </span>
            <span class="font-semibold"> ₸ </span>
          </div>

          <div class="flex items-center">
            <button
              v-press
              class="flex h-full select-none items-center justify-center rounded-xl px-4 py-3 text-black"
              @click.stop="store.addItem(item)"
            >
              <span
                class="material-symbols-rounded rounded-full bg-gray-100 text-black"
              >
                add
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #floating>
      <cart-total-for-mobile
        v-if="!isDesktop"
        @on-search-click="setFocusToInput"
      />
    </template>
  </a-page>
</template>

<script setup>
import AList from "@/components/ui/AList.vue"
import { nextTick, ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store"
import CartTotalForMobile from "@/components/CartTotalForMobile.vue"
import {
  breakpointsTailwind,
  useBreakpoints,
  watchDebounced,
} from "@vueuse/core"
import { useFocusable } from "@/composables/useFocusable"
import { useApiRequest } from "@/composables/useApiRequest"
import { formatMoney } from "@/utils/format-money"
import CartItemDialog from "@/components/CartItemDialog.vue"

const { focusableInput } = useFocusable()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
const inputIsFocused = ref(false)

const store = useCartStore()
const router = useRouter()

const inputValue = ref("")
const notFountInputValue = ref("")

const {
  serverData: searchItem,
  sendRequest: fetchPointItem,
  isError: isSearchError,
  isLoading: isSearchLoading,
  errorMessage: isSearchErrorMessage,
} = useApiRequest()

const addCartItem = async () => {
  isSearchError.value = false
  if (!inputValue.value) {
    return
  }
  isSearchLoading.value = true
  await fetchPointItem("get", "/point/items/" + inputValue.value, {
    searchBy: "code",
  })
  if (!isSearchError.value) {
    store.addItem(searchItem.value)
    isSearchError.value = false
    notFountInputValue.value = ""
  }
  notFountInputValue.value = inputValue.value
  inputValue.value = ""
}

const onNewItemCreated = () => {
  inputValue.value = ""
  notFountInputValue.value = ""
  isSearchError.value = false
}

const onSearchInput = () => {
  isSearchError.value = false
  notFountInputValue.value = ""
}

const setFocusToInput = async () => {
  inputIsFocused.value = true
  await nextTick()
  focusableInput.value.focus()
}
const unsetFocusFromInput = async () => {
  /**
   * Сбрасывает фокус с инпута.
   *
   * Используется `setTimeout` с минимальной задержкой, чтобы гарантировать,
   * что события `click` на элементах списка обработаются до изменения состояния `inputIsFocused`.
   *
   * Причина:
   * При клике на элемент списка обработчик `blur` для инпута срабатывает раньше,
   * чем завершится добавление элемента в корзину. Это приводит к тому, что
   * состояние обновляется некорректно, и список скрывается.
   *
   * Решение:
   * Используем минимальную задержку в `setTimeout`, чтобы дать событию `click` завершиться
   * до изменения состояния интерфейса.
   */
  setTimeout(() => {
    if (inputValue.value === "") {
      inputIsFocused.value = false
    }
  }, 0)
  // await nextTick()
  // inputIsFocused.value = false
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
  unsetFocusFromInput()
}
</script>
