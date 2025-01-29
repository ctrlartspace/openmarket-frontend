<template>
  <div
    class="flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white"
  >
    <div
      v-if="selectedItems.length > 0"
      class="flex w-full cursor-pointer items-center border-b border-gray-100 bg-white last:border-none md:hover:bg-gray-50/50 md:active:bg-gray-100"
    >
      <div v-if="selectable" class="flex items-center py-3 pl-4">
        <Checkbox binary @input="selectAll" />
      </div>
      <div class="w-full truncate px-4 py-3 font-medium">
        Выбрано: {{ selectedItems.length }}
      </div>
    </div>
    <div
      v-for="(item, i) in items"
      :key="i"
      class="flex w-full cursor-pointer flex-col items-center border-b border-gray-100 bg-white px-4 py-3 last:border-none hover:bg-gray-50 active:bg-gray-100"
      @click="emits('onItemClick', item)"
    >
      <div class="flex w-full gap-4">
        <div v-if="selectable" class="flex items-center">
          <Checkbox v-model="selectedItems" :value="item.id" @click.stop />
        </div>
        <div v-if="titleField" class="w-full truncate">
          <slot :item="item" name="title">
            {{ getNestedProperty(item, titleField) }}
          </slot>
        </div>
        <div
          v-if="descriptionField"
          class="w-max whitespace-nowrap font-medium"
        >
          <slot :item="item" name="description">
            {{
              `${getNestedProperty(item, descriptionField)}  ${descriptionHint}`
            }}
          </slot>
        </div>
        <div v-if="hasAction" class="flex items-center gap-2">
          <slot :item="item" name="action"></slot>
        </div>
      </div>
      <div v-if="hasSub" class="w-full">
        <slot :item="item" name="sub"><span></span></slot>
      </div>
    </div>
    <div v-if="hasLast" class="px-4 py-3">
      <slot name="last"></slot>
    </div>

    <div v-if="hasNoItems" class="px-4 py-3">
      <p class="text-center text-gray-300">Нет данных</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineModel, useSlots } from "vue"

const props = defineProps({
  items: { type: Array, required: true, default: () => [] },
  titleField: { type: String, default: null },
  descriptionField: { type: String, default: null },
  descriptionHint: { type: String, default: "" },
  selectable: { type: Boolean },
})

const emits = defineEmits(["onItemClick"])

const selectedItems = defineModel({ default: [] })
const slots = useSlots()
const hasAction = computed(() => !!slots.action)
const hasNoItems = computed(() => props.items.length === 0)
const hasLast = computed(() => !!slots.last)
const hasSub = computed(() => !!slots.sub)

const getNestedProperty = (obj, path) => {
  const val = path.split(".").reduce((acc, key) => acc && acc[key], obj)
  return val === null || val === undefined ? "Неизв." : val
}

const selectAll = (event) => {
  const isChecked = event.target.checked
  if (isChecked) {
    props.items.forEach((item) => {
      if (!selectedItems.value.includes(item.id)) {
        selectedItems.value.push(item.id)
      }
    })
  } else {
    selectedItems.value = []
  }
}
</script>

<style lang="scss" scoped></style>
