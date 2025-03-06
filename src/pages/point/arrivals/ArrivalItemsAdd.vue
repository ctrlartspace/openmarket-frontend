<template>
  <a-page title="Новое поступление">
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>

      <a-modal
        #="{ props }"
        :async-operation="handleCreateArrival"
        title="Создать поступление?"
      >
        <Button fluid severity="help" v-bind="props">
          <span class="material-symbols-rounded">done</span>
          <span class="font-medium"> Готово</span>
        </Button>
      </a-modal>

      <div v-if="isSearchError">
        <div
          :class="[
            isSearchError
              ? 'animate-shake will-change-transform'
              : 'text-black',
            'mt-4 flex w-full flex-col justify-between text-ellipsis rounded-xl border border-gray-100 bg-white px-4 py-3 font-medium text-red-600 placeholder:font-normal placeholder:text-gray-300 focus:outline-black focus:ring-0 dark:border-neutral-800 dark:bg-black dark:text-red-400',
          ]"
        >
          <div class="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
            <p class="flex items-center gap-2">
              {{ notFoundInputValue }}
            </p>
            <span class="text-sm font-normal dark:text-neutral-300"
              >Штрихкод не найден</span
            >
          </div>
          <new-item-dialog
            #="{ props }"
            :code="notFoundInputValue"
            :fields="['purchasePrice']"
            @success="onNewItemCreated"
          >
            <button
              class="mt-2 flex justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300"
              v-bind="props"
            >
              <span class="material-symbols-rounded">add_shopping_cart</span>
              <span class="font-medium">Создать</span>
            </button>
          </new-item-dialog>
        </div>
      </div>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="handleCreateArrival"
        title="Создать поступление?"
      >
        <a-button-floating-text black solid v-bind="props">
          Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <v-form @submit.prevent="addItemByCode">
        <InputText
          ref="focusableInput"
          v-model.trim="inputValue"
          class="mb-2"
          fluid
          placeholder="Наименование"
          type="text"
        />
      </v-form>

      <div v-if="pointItems && inputValue.length > 0" class="">
        <p class="mb-2 px-4 text-gray-300 dark:text-neutral-600">
          Выберите товар
        </p>
        <a-list
          :items="pointItems"
          description-field="sellingPrice"
          description-hint="₸"
          title-field="name"
          @on-item-click="addArrivalItem"
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

      <div v-if="inputValue.length === 0" class="flex flex-col gap-2">
        <p class="px-4 text-gray-300 dark:text-neutral-600">
          Товары в поступлении
        </p>
        <a-list
          :items="arrivalStore.groupedArrivalItems"
          description-field="count"
          description-hint="шт."
          title-field="name"
        >
          <template #title="{ item }">
            <span class="flex items-center gap-2">
              {{ item.name }}
            </span>
          </template>
          <template #description="{ item }">
            <span class="font-semibold">
              {{ item.count }}
              <span>шт.</span>
            </span>
          </template>
          <template #action="{ item }">
            <button
              v-press
              class="flex h-full select-none items-center justify-center rounded-xl"
              @click.stop="removeArrivalItem(item)"
            >
              <span
                class="material-symbols-rounded rounded-full bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400"
              >
                remove
              </span>
            </button>
            <button
              v-press
              class="flex h-full select-none items-center justify-center rounded-xl text-black"
              @click.stop="addArrivalItem(item)"
            >
              <span
                class="material-symbols-rounded rounded-full bg-gray-100 text-black dark:bg-black dark:text-neutral-200"
              >
                add
              </span>
            </button>
          </template>
        </a-list>

        <InputText
          v-model.trim="arrivalStore.comment"
          class="mb-2"
          fluid
          placeholder="Комментарий (опционально)"
          type="text"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { ref } from "vue"
import { useApiRequest } from "@/composables/useApiRequest.js"
import { watchDebounced } from "@vueuse/core"
import { useRouter } from "vue-router"
import AList from "@/components/ui/AList.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import { useArrivalStore } from "@/stores/arrival.store.js"
import { useFocusable } from "@/composables/useFocusable.js"
import NewItemDialog from "@/components/NewItemDialog.vue"
import AModal from "@/components/ui/AModal.vue"

const { focusableInput } = useFocusable()
const router = useRouter()
const inputValue = ref("")
const arrivalStore = useArrivalStore()
const notFoundInputValue = ref("")

const {
  serverData: searchItem,
  sendRequest: fetchPointItem,
  isError: isSearchError,
  isLoading: isSearchLoading,
  errorMessage: isSearchErrorMessage,
} = useApiRequest()

const addItemByCode = async () => {
  isSearchError.value = false
  if (!inputValue.value) {
    return
  }
  await fetchPointItem("get", "/point/items/" + inputValue.value, {
    searchBy: "code",
  })
  if (!isSearchError.value) {
    arrivalStore.addItem(searchItem.value)
    notFoundInputValue.value = ""
  }
  notFoundInputValue.value = inputValue.value
  inputValue.value = ""
}

const {
  serverData: pointItems,
  sendRequest: fetchPointItems,
  isLoading: isPointItemsFetching,
} = useApiRequest()

watchDebounced(
  inputValue,
  async () => {
    if (inputValue.value.length > 0) {
      await fetchPointItems("get", "/point/items", {
        q: inputValue.value,
      })
    } else {
      pointItems.value = null
    }
  },
  { debounce: 500, maxWait: 1000 },
)

const addArrivalItem = async (item) => {
  arrivalStore.addItem(item)
  inputValue.value = ""
}

const removeArrivalItem = async (item) => {
  arrivalStore.removeItem(item)
}

// Обработка создания поступления
const handleCreateArrival = async () => {
  const response = await arrivalStore.createArrival()
  if (response) {
    await router.push("/point/arrivals")
  }
}

const onNewItemCreated = (newItem) => {
  inputValue.value = ""
  notFoundInputValue.value = ""
  isSearchError.value = false
  arrivalStore.addItem(newItem)
}
</script>

<style lang="scss" scoped></style>
