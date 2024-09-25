<template>
  <div class="flex flex-col gap-2">
    <div class="overflow-auto rounded-xl border border-neutral-300 md:rounded">
      <table
        class="w-full whitespace-nowrap bg-white text-left text-lg md:text-base"
      >
        <tbody>
          <tr
            v-for="item in tableData"
            :key="item.id"
            class="cursor-pointer border-b border-neutral-300 last:border-none hover:bg-gray-50 active:bg-gray-50"
            @click="emit('onItemClick', item)"
          >
            <td v-if="selectable" class="hidden w-2 py-2 pl-4 md:table-cell">
              <div class="flex h-4 w-4 items-center justify-center">
                <input
                  v-model="selectedItems"
                  :value="item.id"
                  class="h-4 w-4"
                  type="checkbox"
                  @change="$emit('update:modelValue', selectedItems)"
                  @click.stop
                />
              </div>
            </td>
            <td
              v-for="field in tableFields"
              :key="field.name"
              :class="field.className"
              class="px-4 py-2"
            >
              <slot :item="item" :name="field.name">
                <span>
                  {{ getNestedProperty(item, field.name) }}
                  <!-- {{ item[field.name] }} -->
                </span>
                <span v-if="field.postfix">{{ field.postfix }}</span>
              </slot>
            </td>
          </tr>
          <tr
            v-if="tableData.length === 0"
            class="cursor-pointer border-b border-neutral-300 p-4 last:border-none hover:bg-gray-50 active:bg-gray-50"
          >
            <td class="px-4 py-2 text-center">
              <span class="text-gray-300"> Нет данных </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  modelValue: {},
  selectable: {
    type: Boolean,
    default: true,
  },
  tableData: {
    type: Object,
    required: true,
  },
  tableFields: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["onItemClick", "update:modelValue"])
const selectedItems = ref([])

const getNestedProperty = (obj, path) =>
  path.split(".").reduce((acc, key) => acc && acc[key], obj)
</script>
