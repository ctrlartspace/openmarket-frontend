<template>
  <div
    ref="selectField"
    class="relative cursor-pointer border-b border-gray-200 px-4 py-3 last:border-none"
  >
    <span v-if="selectedItems.length > 0" class="flex-1 text-gray-300">{{
      placeholder
    }}</span>
    <div class="flex items-center">
      <input
        class="block w-full cursor-pointer appearance-none bg-inherit placeholder:font-normal placeholder:text-gray-300 focus:outline-none"
        :class="$attrs.disabled ? 'text-black' : 'text-blue-600'"
        type="text"
        :value="selectedItems"
        :placeholder="placeholder"
        @click="onClick"
        v-bind="$attrs"
        readonly
      />
      <span
        v-if="!$attrs.disabled"
        class="material-symbols-rounded md:text-[28px]"
        :class="
          selectedItems && selectedItems.length > 0
            ? 'text-black'
            : 'text-gray-300'
        "
        @click="onClick"
        >{{ isActive ? "expand_less" : "expand_more" }}</span
      >
      <div
        v-if="isActive"
        class="absolute left-0 top-full z-10 w-full overflow-auto rounded-b border-t border-gray-200 bg-white shadow-xl"
      >
        <slot :is-active="isActive">
          <ul class=" ">
            <li
              v-for="(item, i) in items"
              class="cursor-pointer px-4 py-3 hover:bg-gray-100 active:bg-gray-100"
              @click.stop="onItemClick(item)"
              :key="i"
            >
              {{ item[itemTitle] }}
            </li>
          </ul>
        </slot>
      </div>
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
