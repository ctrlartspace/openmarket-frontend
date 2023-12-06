<template>
  <div>
    <div class="relative px-4 py-2 border-b flex items-center justify-between">
      <p class="text-lg font-semibold">{{ title }}</p>
      <span
        class="material-icons-outlined hover:text-gray-600 cursor-pointer"
        @click="isMoreActive = !isMoreActive"
        >more_vert</span
      >
      <div
        v-if="isMoreActive"
        class="absolute z-10 w-full left-0 top-full bg-white border-t rounded-b border-gray-200 shadow-xl"
      >
        <ul class="text-lg">
          <li
            class="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <span class="material-icons-outlined">edit</span>
            Редактировать
          </li>
          <li
            class="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="addItemClick"
          >
            <span class="material-icons-outlined">add</span>
            Добавить
          </li>
        </ul>
      </div>
    </div>
    <div
      v-for="(item, i) in items"
      class="flex items-center gap-3 px-4 py-2 border-b"
    >
      <input
        type="checkbox"
        class="w-4 h-4 text-lg rounded"
        :value="item[itemValue]"
        :checked="modelValue.find((i) => String(i) === String(item[itemValue]))"
        @input="onCheckedChange"
        @click.stop
      />
      <span class="text-lg">{{ item[itemName] }}</span>
    </div>
    <div v-if="isAddMode" class="flex items-center gap-3 px-4 py-2 border-b">
      <input
        v-model="newItemName"
        ref="inputNewItem"
        class="w-full text-lg placeholder:text-gray-300 focus:outline-none"
        type="text"
        placeholder="Название"
        @keyup.enter="addNewItem"
      />
      <span
        class="material-icons-outlined cursor-pointer hover:text-blue-600"
        :class="newItemName ? 'text-black ' : 'text-gray-300'"
        @click="addNewItem"
        >add</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue"

const props = defineProps([
  "items",
  "title",
  "itemValue",
  "itemName",
  "modelValue",
])
const emit = defineEmits(["addItemClick", "update:modelValue"])

const isMoreActive = ref(false)
const isAddMode = ref(false)
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

const addItemClick = async () => {
  newItemName.value = ""
  isMoreActive.value = false
  isAddMode.value = true
  await nextTick()
  inputNewItem.value.focus()
}

const addNewItem = async () => {
  isMoreActive.value = false
  isAddMode.value = false
  emit("addItemClick", newItemName.value)
}
</script>
