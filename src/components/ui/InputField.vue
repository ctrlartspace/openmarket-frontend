<template>
  <div class="border-b border-gray-200 px-4 py-2 last:border-none">
    <span v-if="modelValue" class="flex-1 text-lg text-gray-300 md:text-base">{{
      $attrs.placeholder
    }}</span>
    <div class="flex items-center">
      <input
        type="text"
        class="block w-full appearance-none bg-inherit text-lg placeholder:font-normal placeholder:text-gray-300 focus:outline-none md:text-base"
        :class="$attrs.disabled ? 'text-black' : 'text-blue-600'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      <span
        v-if="modelValue && !$attrs.disabled"
        class="material-symbols-outlined cursor-pointer text-black hover:text-gray-600 active:text-gray-600 md:text-[28px]"
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
