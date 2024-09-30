<template>
  <label class="wrapper flex items-center">
    {{ label }}
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  value: { type: String },
  modelValue: { default: "" },
  label: { type: String, required: true },
  trueValue: { default: true },
  falseValue: { default: false },
})

const emit = defineEmits(["change"])

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue === props.trueValue
})

const updateInput = (event) => {
  const isChecked = event.target.checked
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    if (isChecked) {
      newValue.push(props.value)
    } else {
      newValue.splice(newValue.indexOf(props.value), 1)
    }
    emit("change", newValue)
  } else {
    emit("change", isChecked ? props.trueValue : props.falseValue)
  }
}
</script>
