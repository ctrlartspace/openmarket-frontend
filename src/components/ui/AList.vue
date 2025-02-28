<template>
  <div
    class="flex w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-neutral-900"
  >
    <div
      v-if="selectedItems.length > 0"
      class="flex w-full cursor-pointer items-center border-b border-gray-100 bg-white last:border-none dark:border-neutral-800 dark:bg-neutral-900 md:hover:bg-gray-50/50 dark:md:hover:bg-neutral-800/50"
    >
      <div v-if="selectable" class="flex items-center py-3 pl-4">
        <Checkbox binary @input="selectAll" />
      </div>
      <div class="w-full truncate px-4 py-3 font-medium">
        Выбрано: {{ selectedItems.length }}
      </div>
      <div class="whitespace-nowrap">
        <slot name="selectAction"></slot>
      </div>
    </div>
    <div
      v-for="(item, i) in sortedItems"
      :key="i"
      class="flex w-full cursor-pointer flex-col items-center border-b border-gray-100 bg-white px-4 py-3 text-black last:border-none hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:md:hover:bg-neutral-800/50"
      @click="emits('onItemClick', item)"
    >
      <div class="flex w-full gap-4">
        <div v-if="selectable" class="flex items-center">
          <Checkbox
            v-model="selectedItems"
            :value="item[idField]"
            @click.stop
          />
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

    <div v-if="hasNoItems" class="bg-gray-50 px-4 py-3 dark:bg-neutral-900">
      <p class="text-center text-gray-300 dark:text-neutral-600">Нет данных</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineModel, useSlots } from "vue"

const props = defineProps({
  items: { type: Array, required: true, default: () => [] },
  idField: { type: String, default: "id" },
  titleField: { type: String, default: null },
  descriptionField: { type: String, default: null },
  descriptionHint: { type: String, default: "" },
  selectable: { type: Boolean },
  sortField: { type: String, default: null },
  sortOrder: { type: String, default: "asc" }, // asc или desc
})

const emits = defineEmits(["onItemClick"])
const selectedItems = defineModel({ default: [] })
const slots = useSlots()
const hasAction = computed(() => !!slots.action)
const hasNoItems = computed(() => props.items.length === 0)
const hasLast = computed(() => !!slots.last)
const hasSub = computed(() => !!slots.sub)

const getNestedProperty = (obj, path) => {
  const val = path?.split(".").reduce((acc, key) => acc && acc[key], obj)
  return val === null || val === undefined ? "Неизв." : val
}

const sortedItems = computed(() => {
  if (!props.sortField) return props.items
  return [...props.items].sort((a, b) => {
    const valA = getNestedProperty(a, props.sortField)
    const valB = getNestedProperty(b, props.sortField)
    return props.sortOrder === "asc"
      ? valA > valB
        ? 1
        : -1
      : valA < valB
        ? 1
        : -1
  })
})

const selectAll = (event) => {
  const isChecked = event.target.checked
  if (isChecked) {
    props.items.forEach((item) => {
      if (!selectedItems.value.includes(item[props.idField])) {
        selectedItems.value.push(item[props.idField])
      }
    })
  } else {
    selectedItems.value = []
  }
}
</script>

<style lang="scss" scoped></style>
