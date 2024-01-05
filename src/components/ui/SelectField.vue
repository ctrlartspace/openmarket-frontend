<template>
  <div
    ref="selectField"
    class="relative flex items-center border-b border-gray-200 cursor-pointer last:border-none"
  >
    <input
      class="block w-full px-4 py-2 text-lg bg-inherit placeholder:text-gray-300 focus:outline-none cursor-pointer"
      :class="$attrs.disabled ? 'text-black' : 'text-blue-600'"
      type="text"
      :placeholder="placeholder"
      :value="selectedItems"
      @click="onClick"
      v-bind="$attrs"
      readonly
    />
    <span
      v-if="!$attrs.disabled"
      class="px-4 py-2 material-icons-outlined"
      :class="selectedItems ? 'text-black' : 'text-gray-300'"
      @click="onClick"
      >{{ isActive ? "expand_less" : "expand_more" }}</span
    >
    <div
      v-if="isActive"
      class="absolute z-10 w-full left-0 top-full bg-white border-t rounded-b border-gray-200 shadow-xl overflow-auto"
    >
      <slot :is-active="isActive">
        <ul class="text-lg">
          <li
            v-for="(item, i) in items"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click.stop="onItemClick(item)"
            :key="i"
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

const selectedItems = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.items
      .filter((item) => props.modelValue.includes(item[props.itemValue]))
      .map((item) => item.name)
      .join(", ")
  }

  return []
})
const selectField = ref(null)

const hideDropdown = (event) => {
  if (!selectField.value.contains(event.target)) {
    isActive.value = false
    document.removeEventListener("click", hideDropdown)
  }
}

const onClick = () => {
  isActive.value = !isActive.value
  document.addEventListener("click", hideDropdown)
}

const onItemClick = (item) => {
  emit("update:modelValue", item[props.itemValue])
  emit("change", item)
  isActive.value = false
}
</script>
