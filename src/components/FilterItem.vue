<template>
  <div
    class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
    @click="expandClick"
  >
    <div class="flex items-center">
      <input
        v-model="model"
        type="checkbox"
        class="w-4 h-4"
        :value="item.id"
        @click.stop
      />
    </div>
    <span
      class="w-full bg-inherit text-lg placeholder:text-gray-300 focus:outline-none"
    >
      {{ item.name }}
    </span>

    <span v-if="showExpand" class="material-icons-outlined">
      {{ isExpand ? "expand_less" : "expand_more" }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps(["item", "showExpand", "isExpand", "modelValue"])
const emit = defineEmits(["onExpandToggle", "update:modelValue"])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const expandClick = () => {
  emit("onExpandToggle", !props.isExpand)
}
</script>
