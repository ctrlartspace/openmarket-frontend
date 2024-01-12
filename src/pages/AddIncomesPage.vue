<template>
  <div class="grid grid-cols-6 gap-4 h-96">
    <div class="col-span-4">
      <div class="bg-white border rounded h-96">
        <div class="px-4 py-2 flex gap-2 border-b last:border-none">
          <div class="relative flex-1 flex gap-2 items-center h-7">
            <span class="material-icons text-gray-300">search</span>
            <v-form @submit.prevent="addIncomeItem" class="relative w-full">
              <input
                ref="searchInput"
                v-model.trim="inputValue"
                type="text"
                class="w-full h-full text-lg placeholder:text-gray-300 focus:outline-none"
                :class="
                  isSearchError ? 'text-red-600 animate-shake' : 'text-black'
                "
                @input="isSearchError = false"
                placeholder="Код товара, наименование"
              />
            </v-form>
          </div>
        </div>
        <table class="table-auto w-full text-lg text-left bg-white">
          <tbody>
            <tr
              v-if="incomeItems.length === 0"
              class="border-b flex justify-center px-4 py-2 last:border-none"
            >
              <span class="text-gray-300 text-lg">Нет данных</span>
            </tr>
            <tr
              v-else
              v-for="(item, i) in groupedIncomeItems"
              class="cursor-pointer hover:bg-gray-50 border-b flex items-center justify-between gap-2 px-4 py-2"
              @click="onItemClick(item.id)"
              :key="i"
            >
              <td class="flex items-center">
                <span
                  class="material-icons rounded hover:bg-red-100 hover:text-red-700 select-none"
                  @click.stop="removeItem(item.id)"
                >
                  remove
                </span>
              </td>
              <td class="font-semibold flex-1">
                {{ item.name }}
              </td>
              <td>
                <input
                  v-model.number="item.count"
                  class="rounded border border-gray-200 px-2 bg-inherit text-lg focus:outline-none focus:text-blue-600"
                  :size="String(item.count).length"
                  @click.stop
                />
                шт.
              </td>
              <td class="text-green-600 font-semibold">
                {{ item.count * item.purchasePrice }} KZT
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="col-span-2 bg-white border border-gray-2addIncomesItems p-4 rounded"
    >
      <input class="max-w-fit red-100" value="1" @click.stop />
      <!-- <button type="button" @click="addIncomesItems">add</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { getItem, makeIncome } from "@/services/ItemSearch"

const router = useRouter()

const searchInput = ref(null)
const inputValue = ref("")
const isSearchError = ref(false)

const incomeItems = ref(new Map())

const groupedIncomeItems = computed(() =>
  [...incomeItems.value].map((el) => el[1])
)

const isEmpty = computed(() => incomeItems.value.size === 0)

const getItemsForIncome = computed(() =>
  groupedIncomeItems.value.map((item) => {
    return {
      itemId: item.id,
      purchasePrice: item.sellingPrice,
      count: item.count,
    }
  })
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
    const item = await getItem(inputValue.value)
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

const onItemClick = (id) => {
  router.push(`/items/${id}`)
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
