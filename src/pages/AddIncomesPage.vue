<template>
  <div class="grid grid-cols-6 gap-4 p-4 md:p-2">
    <div class="col-span-10 md:col-span-4">
      <div class="h-96 rounded border bg-white">
        <div class="flex gap-2 border-b px-4 py-2 last:border-none">
          <div class="relative flex h-7 flex-1 items-center gap-2">
            <span class="material-symbols-outlined text-gray-300 md:text-[28px]"
              >search</span
            >
            <v-form @submit.prevent="addIncomeItem" class="relative w-full">
              <input
                ref="searchInput"
                v-model.trim="inputValue"
                type="text"
                class="h-full w-full text-ellipsis text-lg placeholder:text-gray-300 focus:outline-none md:text-base"
                :class="
                  isSearchError ? 'animate-shake text-red-600' : 'text-black'
                "
                @input="isSearchError = false"
                placeholder="Код товара, наименование"
              />
            </v-form>
          </div>
        </div>
        <table
          class="w-full table-auto bg-white text-left text-lg md:text-base"
        >
          <tbody>
            <tr
              v-if="incomeItems.length === 0"
              class="flex justify-center border-b px-4 py-2 last:border-none"
            >
              <span class="text-lg text-gray-300 md:text-base">Нет данных</span>
            </tr>
            <tr
              v-else
              v-for="(item, i) in groupedIncomeItems"
              class="flex cursor-pointer items-center justify-between gap-2 border-b px-4 py-2 hover:bg-gray-50 active:bg-gray-50"
              @click="onItemClick(item)"
              :key="i"
            >
              <td class="flex items-center">
                <span
                  class="material-symbols-outlined select-none rounded hover:bg-red-100 hover:text-red-700"
                  @click.stop="removeItem(item.id)"
                >
                  remove
                </span>
              </td>
              <td class="flex-1 font-medium">
                {{ item.name }}
              </td>
              <td>
                <input
                  v-model.number="item.count"
                  class="rounded border border-gray-200 bg-inherit px-2 text-lg focus:text-blue-600 focus:outline-none md:text-base"
                  :size="String(item.count).length"
                  @click.stop
                />
                шт.
              </td>
              <td class="font-medium text-green-600">
                {{ item.count * item.purchasePrice }} KZT
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="border-gray-2 col-span-10 rounded border bg-white p-4 md:col-span-2"
    >
      <button
        class="flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:brightness-90"
        @click="addIncomesItems"
      >
        <span class="text-lg md:text-base">Добавить</span>
      </button>
      <!-- <button type="button" @click="addIncomesItems">add</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { getPointItem, makeIncome } from "@/services/ItemSearch"

const router = useRouter()

const searchInput = ref(null)
const inputValue = ref("")
const isSearchError = ref(false)

const incomeItems = ref(new Map())

const groupedIncomeItems = computed(() =>
  [...incomeItems.value].map((el) => el[1]),
)

const isEmpty = computed(() => incomeItems.value.size === 0)

const getItemsForIncome = computed(() =>
  groupedIncomeItems.value.map((item) => {
    return {
      itemId: item.id,
      purchasePrice: item.purchasePrice,
      count: item.count,
    }
  }),
)

const addItem = (item) => {
  const existingItem = incomeItems.value.get(item.id)
  if (existingItem) {
    existingItem.count += 1
    existingItem.totalPrice = existingItem.count * existingItem.sellingPrice
  } else {
    incomeItems.value.set(item.id, {
      ...item,
      count: 1,
      totalPrice: item.sellingPrice,
    })
  }
}

const removeItem = (id) => {
  const item = incomeItems.value.get(id)
  if (item && item.count > 1) {
    item.count -= 1
    item.totalPrice = item.count * item.sellingPrice
  } else {
    incomeItems.value.delete(id)
  }
}

const clearItems = () => {
  incomeItems.value.clear()
}

const addIncomeItem = async () => {
  isSearchError.value = false
  if (!inputValue.value) {
    return
  }

  try {
    const item = await getPointItem(inputValue.value)
    addItem(item)
    inputValue.value = ""
    isSearchError.value = false
  } catch (error) {
    isSearchError.value = true
    console.error(error)
  }
}

const addIncomesItems = async () => {
  const response = await makeIncome(getItemsForIncome.value)
  console.log(response)
  clearItems()
}

const onItemClick = (item) => {
  router.push(`/items/${item.id}`)
}

const setInputFocus = async () => {
  if (searchInput.value) {
    await nextTick()
    searchInput.value.focus()
  }
}
onMounted(async () => {
  window.addEventListener("keypress", setInputFocus)
})
onBeforeUnmount(() => {
  window.removeEventListener("keypress", setInputFocus)
})
</script>
