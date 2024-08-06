<template>
  <div>
    <label :for="$attrs.id" class="font-medium">{{ label }}</label>
    <router-link
      v-if="routeLink && inputValue"
      :to="routeLink.path"
      class="ml-2 text-blue-500"
      >{{ routeLink.title }}</router-link
    >
    <div class="relative">
      <input
        v-model="inputValue"
        v-bind="$attrs"
        class="block mt-2 px-4 py-2 w-full rounded-xl md:rounded border border-solid focus:outline-black peer"
        :class="{
          'bg-red-50 placeholder:text-red-400': isError,
        }"
      />
      <div
        v-if="unit"
        class="absolute top-0 bottom-0 right-0 pr-4 flex items-center justify-center"
      >
        <span class="text-gray-400"> {{ unit }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
import { computed } from "vue"

const props = defineProps({
  modelValue: {},
  label: {
    type: String,
    required: true,
  },
  isError: {
    type: Boolean,
    required: false,
  },
  routeLink: {
    type: Object,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(["update:modelValue"])
const inputValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
})
</script>

<style lang="scss" scoped></style>
