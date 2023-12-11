<template>
  <div
    class="flex items-center gap-3 px-4 py-2 border-t hover:bg-gray-50 cursor-pointer"
    @click="expandClick"
  >
    <div class="flex items-center">
      <input
        type="checkbox"
        class="w-4 h-4"
        :value="item[itemValue]"
        :checked="modelValue.find((i) => String(i) === String(item[itemValue]))"
        @input="onCheckedChange"
        @click.stop
      />
    </div>
    <span
      class="w-full bg-inherit text-lg placeholder:text-gray-300 focus:outline-none"
    >
      {{ item[itemName] }}
    </span>
    <span v-if="showExpand" class="material-icons-outlined">
      {{ isExpand ? "expand_less" : "expand_more" }}
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps([
  "item",
  "itemValue",
  "itemName",
  "showExpand",
  "modelValue",
])
const emit = defineEmits(["onExpandToggle", "update:modelValue"])

const isExpand = ref(false)

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

const expandClick = () => {
  isExpand.value = !isExpand.value
  emit("onExpandToggle", isExpand.value)
}
</script>
