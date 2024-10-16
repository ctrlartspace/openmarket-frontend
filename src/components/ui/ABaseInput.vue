<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="$attrs.id"
      class="text-lg font-medium md:text-base"
      >{{ label }}</label
    >
    <router-link
      v-if="routeLink && inputValue"
      :to="routeLink.path"
      class="ml-2 text-blue-500"
      >{{ routeLink.title }}
    </router-link>
    <div class="relative">
      <input
        v-model="inputValue"
        :class="{
          'animate-shake will-change-transform placeholder:text-red-500':
            isError,
        }"
        class="peer block w-full rounded-xl border border-solid border-neutral-300 px-4 py-2 text-lg placeholder:text-neutral-300 focus:outline-black focus:ring-0 md:rounded-lg md:text-base"
        v-bind="$attrs"
      />
      <div
        class="absolute bottom-0 right-0 top-0 flex items-center justify-center gap-1 pr-4"
      >
        <span
          v-if="unit"
          class="text-lg font-medium text-neutral-300 md:text-base"
        >
          {{ unit }}
        </span>

        <slot name="action"></slot>
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
    required: false,
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
