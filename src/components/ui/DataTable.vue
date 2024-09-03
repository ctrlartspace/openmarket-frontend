<template>
  <div class="flex flex-col gap-2">
    <div class="border border-neutral-300 rounded-xl md:rounded overflow-hidden">
      <table class="w-full text-lg md:text-base text-left bg-white">
        <tbody>
        <tr
          v-for="item in tableData"
          :key="item.id"
          class="p-4 flex flex-col md:block md:p-0 cursor-pointer hover:bg-gray-50 active:bg-gray-50 border-b border-neutral-300 last:border-none"
          @click="emit('onItemClick', item)"
        >
          <td class="hidden md:table-cell md:pl-4 md:py-2 w-2">
            <div class="w-4 h-4 flex items-center justify-center">
              <input
                v-model="selectedItems"
                :value="item.id"
                class="w-4 h-4"
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
            class="md:px-4 md:py-2"
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
          class="p-4 flex flex-col md:block md:p-0 cursor-pointer hover:bg-gray-50 active:bg-gray-50 border-b border-neutral-300 last:border-none"
        >
          <td class="text-center md:px-4 md:py-2">
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
  tableData: {
    type: Object,
    required: true
  },
  tableFields: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["onItemClick", "update:modelValue"])
const selectedItems = ref([])

const getNestedProperty = (obj, path) =>
  path.split(".").reduce((acc, key) => acc && acc[key], obj)
</script>
