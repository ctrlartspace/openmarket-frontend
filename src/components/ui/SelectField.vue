<template>
  <div
    class="relative flex items-center border-b border-gray-200 cursor-pointer"
    @click=";(isActive = true), console.log('1')"
    @blur="isActive = false"
    tabindex="1"
  >
    <div class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit">
      <span v-if="!selectedItem" class="text-gray-300 select-none">
        {{ placeholder }}
      </span>
      <span v-else>{{ selectedItem[itemTitle] }}</span>
    </div>
    <span
      class="px-4 py-2 text-black material-icons-outlined hover:text-gray-600"
      >expand_more</span
    >
    <div
      v-if="isActive"
      class="absolute w-full left-0 top-full bg-white border-t rounded-b border-gray-200 shadow-xl"
    >
      <ul class="text-lg">
        <li
          v-for="item in items"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click.stop="onItemClick(item)"
        >
          {{ item[itemTitle] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps([
  "items",
  "placeholder",
  "itemValue",
  "itemTitle",
  "modelValue",
])
const emit = defineEmits(["update:modelValue"])

const isActive = ref(false)
const selectedItem = computed(() =>
  props.items.find((item) => item[props.itemValue] == props.modelValue)
)

const onItemClick = (item) => {
  emit("update:modelValue", item[props.itemValue])
  isActive.value = false
}
</script>
