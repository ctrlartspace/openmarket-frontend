<template>
  <div
    class="flex cursor-pointer items-center gap-3 bg-white px-4 py-2 hover:bg-gray-50 active:bg-gray-50"
    @mousedown.prevent="expandClick"
  >
    <div v-if="selectRoot || item.parentId" class="flex items-center">
      <input
        v-model="model"
        type="checkbox"
        class="h-5 w-5 md:h-4 md:w-4"
        :value="item.id"
        @click.stop
      />
    </div>
    <span
      class="w-full overflow-hidden bg-inherit placeholder:text-gray-300 focus:outline-none"
    >
      {{ item.name }}
    </span>

    <span v-if="showExpand" class="material-symbols-rounded md:text-[28px]">
      {{ isExpand ? "expand_less" : "expand_more" }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps([
  "item",
  "showExpand",
  "isExpand",
  "selectRoot",
  "modelValue",
])
const emit = defineEmits(["onExpandToggle", "update:modelValue"])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
    console.log(value)
  },
})

const expandClick = () => {
  emit("onExpandToggle", !props.isExpand)
}
</script>
