<template>
  <ul>
    <li class="border-t first:border-none" v-for="item in firstItems">
      <filter-item
        class="pl-4"
        v-model="selectedItems"
        :item="item"
        :showExpand="item.items && item.items.length > 0"
        @on-expand-toggle="(v) => (item.subVisible = v)"
        :key="item.id"
        @change="selectChilds(item, $event.target.checked)"
      />
      <ul v-if="item.subVisible">
        <li class="border-t" v-for="subitem in item.items">
          <filter-item
            class="pl-6"
            v-model="selectedItems"
            :item="subitem"
            :showExpand="subitem.items && subitem.items.length > 0"
            @on-expand-toggle="(v) => (subitem.subVisible = v)"
            :key="subitem.id"
            @change="selectChilds(subitem, $event.target.checked)"
          />
          <ul v-if="subitem.subVisible">
            <li class="border-t" v-for="subsubitem in subitem.items">
              <filter-item
                class="pl-8"
                v-model="selectedItems"
                :item="subsubitem"
                :showExpand="subsubitem.items && subsubitem.items.length > 0"
                @on-expand-toggle="(v) => (subsubitem.subVisible = v)"
                :key="subsubitem.id"
                @change="selectChilds(subsubitem, $event.target.checked)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </li>

    <li v-if="!isShowFull" class="border-t">
      <button
        class="w-full px-4 py-2 text-start hover:bg-gray-50 flex items-center justify-between"
        @click="isShowFull = true"
      >
        <span class="text-lg">Показать все</span>
        <span class="material-icons-outlined">expand_more</span>
      </button>
    </li>
  </ul>
</template>

<script setup>
import FilterItem from "@/components/FilterItem.vue"
import { ref, computed, watch } from "vue"

const props = defineProps(["items", "single", "modelValue"])
const emit = defineEmits(["update:modelValue"])

const isShowFull = ref(false)
const visibleItemsCount = computed(() =>
  isShowFull.value ? props.items.length : 3
)
const firstItems = computed(() =>
  props.items
    .filter((item) => !item.parent_id)
    .slice(0, visibleItemsCount.value)
)

const selectedItems = ref([])

const updateModelValue = () => {
  emit("update:modelValue", selectedItems.value)
}

const getNestedIds = (obj, ids = []) => {
  if (obj.id) {
    ids.push(obj.id)
  }
  if (obj.items) {
    obj.items.forEach((item) => {
      getNestedIds(item, ids)
    })
  }
  return ids
}

const selectChilds = (item) => {
  if (props.single) {
    selectedItems.value = [item.id]
    return
  }
  const nestedIds = getNestedIds(item)
  nestedIds
    .filter((id) => id != item.id)
    .forEach((id) => {
      const index = selectedItems.value.indexOf(id)
      if (index === -1) {
        selectedItems.value.push(id)
      } else {
        selectedItems.value.splice(index, 1)
      }
    })
}

watch(selectedItems, updateModelValue)
</script>
