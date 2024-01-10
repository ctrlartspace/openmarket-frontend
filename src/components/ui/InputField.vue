<template>
  <div class="px-4 py-2 border-b border-gray-200 last:border-none">
    <span v-if="modelValue" class="flex-1 text-lg text-gray-300">{{
      $attrs.placeholder
    }}</span>
    <div class="flex items-center">
      <input
        type="text"
        class="block w-full text-lg bg-inherit appearance-none placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
        :class="$attrs.disabled ? 'text-black' : 'text-blue-600'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      <span
        v-if="modelValue && !$attrs.disabled"
        class="text-black material-icons-outlined cursor-pointer hover:text-gray-600"
        @click=";(modelValue = ''), $emit('update:modelValue', '')"
        >close</span
      >
    </div>
  </div>
</template>
<script setup>
defineProps(["items", "modelValue"])
defineEmits(["update:modelValue"])
</script>
