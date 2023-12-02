<template>
  <div
    class="px-4 py-2 flex items-center border-b border-gray-200 last:border-none"
  >
    <input
      type="text"
      class="block w-full text-lg text-blue-600 bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <span
      v-if="modelValue"
      class="text-black material-icons-outlined cursor-pointer hover:text-gray-600"
      @click=";(modelValue = ''), $emit('update:modelValue', '')"
      >close</span
    >
  </div>
</template>
<script setup>
defineProps(["items", "modelValue"])
defineEmits(["update:modelValue"])
</script>
