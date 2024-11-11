<template>
  <div class="flex flex-col gap-2">
    <div
      class="overflow-auto rounded-xl border border-neutral-300 md:border-neutral-200"
    >
      <table
        class="w-full whitespace-nowrap bg-white text-left text-lg md:text-base"
      >
        <thead>
          <tr
            v-if="selectedItems.length > 0"
            class="border-b border-neutral-300 md:border-neutral-200"
          >
            <th class="w-2 py-2 pl-4">
              <div
                class="flex h-5 w-5 items-center justify-center md:h-4 md:w-4"
              >
                <input
                  class="h-5 w-5 md:h-4 md:w-4"
                  type="checkbox"
                  @input="selectAll"
                />
              </div>
            </th>
            <th class="px-4 py-2">Выбрано: {{ selectedItems.length }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in tableData"
            :key="item.id"
            class="cursor-pointer border-b border-neutral-300 last:border-none hover:bg-gray-50 active:bg-gray-50 md:border-neutral-200"
            @click="emit('onItemClick', item)"
          >
            <td v-if="selectable" class="w-2 py-2 pl-4">
              <div
                class="flex h-5 w-5 items-center justify-center md:h-4 md:w-4"
              >
                <input
                  v-model="selectedItems"
                  :value="item.id"
                  class="h-5 w-5 md:h-4 md:w-4"
                  type="checkbox"
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
            class="cursor-pointer border-b border-neutral-300 p-4 last:border-none hover:bg-gray-50 active:bg-gray-50 md:border-neutral-200"
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
import { ref, defineModel } from "vue"

const selectedItems = defineModel({ default: [] })
const props = defineProps({
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

const emit = defineEmits(["onItemClick"])

const selectAll = (event) => {
  const isChecked = event.target.checked
  if (isChecked) {
    props.tableData.forEach((item) => {
      if (!selectedItems.value.includes(item.id)) {
        selectedItems.value.push(item.id)
      }
    })
  } else {
    selectedItems.value = []
  }
}

const getNestedProperty = (obj, path) =>
  path.split(".").reduce((acc, key) => acc && acc[key], obj)
</script>
