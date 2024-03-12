<template>
  <div class="flex flex-col gap-2">
    <div class="border rounded-xl md:rounded overflow-hidden">
      <div
        v-if="selectedItems.length === 0"
        class="px-4 py-2 flex gap-2 items-center bg-white"
      >
        <span class="material-icons md:text-[28px] text-gray-300">search</span>

        <input
          type="text"
          class="w-full h-full text-lg md:text-base placeholder:text-gray-300 focus:outline-none text-ellipsis"
          placeholder="Код товара, наименование"
        />
        <slot name="action"></slot>
      </div>
      <div
        v-else
        class="px-4 py-2 flex gap-2 justify-between items-center bg-white"
      >
        <div
          class="flex gap-2 items-center hover:text-red-600 active:text-red-600 cursor-pointer"
        >
          <span class="material-icons md:text-[28px]">remove</span>
          <span class="hidden md:inline text-lg md:text-base">Удалить</span>
        </div>
        <slot name="afterSelect"> </slot>
      </div>
    </div>
    <div class="border rounded-xl md:rounded overflow-hidden">
      <table class="w-full text-lg md:text-base text-left bg-white">
        <tbody>
          <tr
            v-for="item in tableData"
            :key="item.id"
            class="p-4 flex flex-col md:block md:p-0 cursor-pointer hover:bg-gray-50 active:bg-gray-50 border-b last:border-none"
            @click="emit('onItemClick', item.id)"
          >
            <td class="hidden md:table-cell md:pl-4 md:py-2 w-2">
              <div class="w-4 h-4 flex items-center justify-center">
                <input
                  v-model="selectedItems"
                  class="w-4 h-4"
                  type="checkbox"
                  :value="item.id"
                  @click.stop
                />
              </div>
            </td>
            <td
              v-for="field in tableFields"
              :key="field.field"
              class="md:px-4 md:py-2"
              :class="field.className"
            >
              <slot :name="field.name" :item="item">
                <span>
                  {{ item[field.name] }}
                </span>
                <span v-if="field.postfix">{{ field.postfix }}</span>
              </slot>
            </td>
          </tr>
          <tr
            v-if="tableData.length === 0"
            class="p-4 flex flex-col md:block md:p-0 cursor-pointer hover:bg-gray-50 active:bg-gray-50 border-b last:border-none"
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
const selectedItems = ref([])
</script>
