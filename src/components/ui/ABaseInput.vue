<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <router-link
      v-if="routeLink && inputValue"
      :to="routeLink.path"
      class="ml-2 text-blue-500"
    >{{ routeLink.title }}
    </router-link
    >
    <div class="relative">
      <input
        v-model="inputValue"
        :class="{
          'bg-red-50 placeholder:text-red-400': isError,
        }"
        class="block px-4 py-2 w-full rounded-xl md:rounded border border-neutral-300 border-solid focus:outline-black peer"
        v-bind="$attrs"
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
import { computed, defineEmits, defineProps } from "vue"

const props = defineProps({
  modelValue: {},
  label: {
    type: String,
    required: false
  },
  isError: {
    type: Boolean,
    required: false
  },
  routeLink: {
    type: Object,
    required: false
  },
  unit: {
    type: String,
    required: false
  }
})

const emit = defineEmits(["update:modelValue"])
const inputValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue)
})
</script>

<style lang="scss" scoped></style>
