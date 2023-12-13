<template>
  <div
    class="relative flex items-center border-b border-gray-200 cursor-pointer last:border-none"
  >
    <input
      class="block w-full px-4 py-2 text-lg bg-inherit focus:outline-none cursor-pointer"
      :class="$attrs.disabled ? 'text-black' : 'text-blue-600'"
      type="text"
      :placeholder="placeholder"
      :value="selectedItem && selectedItem[itemTitle]"
      @click="isActive = !isActive"
      v-bind="$attrs"
      readonly
    />
    <!-- <div
      class="block w-full px-4 py-2 text-lg bg-inherit"
      :class="$attrs.disabled ? 'text-black' : 'text-blue-600'"
    >
      <span v-if="!selectedItem" class="text-gray-300">
        {{ placeholder }}
      </span>
      <span v-else>{{ selectedItem[itemTitle] }}</span>
    </div> -->
    <span
      v-if="!$attrs.disabled"
      class="px-4 py-2 material-icons-outlined hover:text-gray-600"
      :class="selectedItem ? 'text-black' : 'text-gray-300'"
      >{{ isActive ? "expand_less" : "expand_more" }}</span
    >
    <div
      v-if="isActive"
      class="absolute z-10 w-full left-0 top-full bg-white border-t rounded-b border-gray-200 shadow-xl"
    >
      <slot class="z-10">
        <ul class="text-lg">
          <li
            v-for="item in items"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click.stop="onItemClick(item)"
          >
            {{ item[itemTitle] }}
          </li>
        </ul>
      </slot>
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
const emit = defineEmits(["change", "update:modelValue"])

const isActive = ref(false)
const selectedItem = computed(() =>
  props.items.find((item) => item[props.itemValue] == props.modelValue)
)

const onItemClick = (item) => {
  emit("update:modelValue", item[props.itemValue])
  emit("change", item)
  isActive.value = false
}
</script>
