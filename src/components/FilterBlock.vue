<template>
  <div class="bg-white border border-gray-200 rounded">
    <div
      class="relative px-4 py-2 border-b flex items-center justify-between last:border-none"
    >
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <button
        class="inline-flex items-center"
        @click="isMoreActive = !isMoreActive"
      >
        <span class="material-icons-outlined hover:text-gray-600 cursor-pointer"
          >more_vert</span
        >
      </button>
      <ul
        v-if="isMoreActive"
        class="absolute z-10 w-full left-0 top-full text-lg bg-white border-t rounded-b border-gray-200 shadow-xl"
      >
        <li>
          <button
            class="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="editItemClick"
          >
            <span class="material-icons-outlined">edit</span>
            Редактировать
          </button>
        </li>
        <li>
          <button
            class="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click.self="addItemClick"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </button>
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="item in firstItems">
        <filter-item
          v-model="filterItems"
          :item="item"
          :item-value="itemValue"
          :item-name="itemName"
        />
        <ul v-if="!item.subcategories">
          <li v-for="subitem in [{ id: 1, name: 'sdf' }]">
            <filter-item
              v-model="filterItemsSub"
              :item="subitem"
              :item-value="itemValue"
              :item-name="itemName"
            />
          </li>
        </ul>
      </li>
      <li v-if="isAddMode" class="flex items-center gap-3 px-4 py-2 border-b">
        <input
          v-model="newItemName"
          ref="inputNewItem"
          class="w-full text-blue-600 bg-inherit text-lg placeholder:text-gray-300 focus:outline-none capitalize"
          type="text"
          placeholder="Название"
          @keyup.enter="addNewItem"
        />
        <button class="flex items-center" @click="addNewItem">
          <span
            class="material-icons-outlined cursor-pointer hover:text-blue-600"
            :class="newItemName ? 'text-black ' : 'text-gray-300'"
            >add</span
          >
        </button>
      </li>
      <li v-if="!isShowFull" class="border-b last:border-none">
        <button
          class="w-full px-4 py-2 text-start hover:bg-gray-50 flex items-center justify-between"
          @click="isShowFull = true"
        >
          <span class="text-lg">Показать все</span>
          <span class="material-icons-outlined">expand_more</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import FilterItem from "@/components/FilterItem.vue"
import { ref, computed, nextTick } from "vue"

const props = defineProps([
  "items",
  "title",
  "itemValue",
  "itemName",
  "modelValue",
])
const emit = defineEmits(["addItemClick", "onUpdateData", "update:modelValue"])

const isShowFull = ref(false)
const visibleItemsCount = computed(() =>
  isShowFull.value ? props.items.length : 3
)
const firstItems = computed(() => props.items.slice(0, visibleItemsCount.value))

const filterItems = ref([])
const filterItemsSub = ref([])
const isMoreActive = ref(false)
const isAddMode = ref(false)
const isEditMode = ref(false)
const inputNewItem = ref(null)
const newItemName = ref(null)

const onCheckedChange = (e) => {
  const value = e.target.value
  const isChecked = e.target.checked
  let currentValue = [...props.modelValue]
  if (isChecked) {
    currentValue.push(value)
  } else {
    currentValue = currentValue.filter((item) => item !== value)
  }
  emit("update:modelValue", currentValue)
}

const editItemClick = () => {
  isAddMode.value = false
  isEditMode.value = true
  isMoreActive.value = false
}

const addItemClick = async () => {
  newItemName.value = ""
  isMoreActive.value = false
  isAddMode.value = true
  isEditMode.value = false
  await nextTick()
  inputNewItem.value.focus()
}

const onDeleteClick = (id) => {
  emit("onDelete", id)
}

const updateItemClick = (item) => {
  emit("onUpdateData", item)
  isEditMode.value = false
}

const addNewItem = async () => {
  isMoreActive.value = false
  isAddMode.value = false
  emit("addItemClick", newItemName.value)
}
</script>
