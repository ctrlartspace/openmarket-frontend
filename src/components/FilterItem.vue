<template>
  <div class="flex items-center gap-3 px-4 py-2">
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
    <input
      v-model="item[itemName]"
      class="w-full bg-inherit text-lg placeholder:text-gray-300 focus:outline-none capitalize"
      type="text"
      placeholder="Название"
      @keyup.enter="updateItemClick(item)"
    />
    <button class="flex items-center">
      <span class="material-icons-outlined">expand_more</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["item", "itemValue", "itemName", "modelValue"])
const emit = defineEmits(["addItemClick", "onUpdateData", "update:modelValue"])

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
</script>
