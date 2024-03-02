<template>
  <ul v-if="firstItems.length > 0">
    <li
      class="border-t first:border-none"
      v-for="(item, i) in firstItems"
      :key="i"
    >
      <filter-item
        class="pl-4"
        v-model="selectedItems"
        :item="item"
        :showExpand="item.items && item.items.length > 0"
        @on-expand-toggle="(v) => (item.subVisible = v)"
        :is-expand="item.subVisible"
        :select-root="selectRoot"
        :key="item.id"
        @change="selectChilds(item, $event.target.checked)"
      />
      <ul v-if="item.subVisible">
        <li class="border-t" v-for="(subitem, i) in item.items" :key="i">
          <filter-item
            class="pl-6"
            v-model="selectedItems"
            :item="subitem"
            :showExpand="subitem.items && subitem.items.length > 0"
            @on-expand-toggle="(v) => (subitem.subVisible = v)"
            :is-expand="subitem.subVisible"
            :select-root="selectRoot"
            :key="subitem.id"
            @change="selectChilds(subitem, $event.target.checked)"
          />
          <ul v-if="subitem.subVisible">
            <li
              class="border-t"
              v-for="(subsubitem, i) in subitem.items"
              :key="i"
            >
              <filter-item
                class="pl-8"
                v-model="selectedItems"
                :item="subsubitem"
                :showExpand="subsubitem.items && subsubitem.items.length > 0"
                @on-expand-toggle="(v) => (subsubitem.subVisible = v)"
                :is-expand="subsubitem.subVisible"
                :select-root="selectRoot"
                :key="subsubitem.id"
                @change="selectChilds(subsubitem, $event.target.checked)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </li>

    <li v-if="isItemsMore" class="border-t">
      <button
        class="w-full px-4 py-2 text-start hover:bg-gray-50 active:bg-gray-50 flex items-center justify-center"
        @click="isShowFull = !isShowFull"
      >
        <span class="material-icons-outlined">{{
          isShowFull ? "expand_less" : "expand_more"
        }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup>
import FilterItem from "@/components/FilterItem.vue"
import { ref, computed } from "vue"

const props = defineProps([
  "items",
  "single",
  "nested",
  "selectRoot",
  "modelValue",
])
const emit = defineEmits(["change", "update:modelValue"])

const VISIBLE_ITEMS_COUNT = 3
const isShowFull = ref(false)
const mainItems = computed(() => props.items.filter((item) => !item.parentId))
const isItemsMore = computed(() => mainItems.value.length > VISIBLE_ITEMS_COUNT)
const visibleItemsCount = computed(() =>
  isShowFull.value ? mainItems.value.length : VISIBLE_ITEMS_COUNT
)
const firstItems = computed(() =>
  mainItems.value.slice(0, visibleItemsCount.value)
)

const emitUpdates = (value) => {
  emit("update:modelValue", value)
  emit("change", value)
}
const selectedItems = computed({
  get() {
    if (props.modelValue) {
      return Array.isArray(props.modelValue)
        ? props.modelValue
        : [props.modelValue]
    }
    return []
  },
  set(value) {
    emitUpdates(value)
  },
})

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

const selectChilds = (item, isChecked) => {
  if (props.single) {
    selectedItems.value = isChecked ? item.id : null
    emitUpdates(isChecked ? item.id : null)
    return
  }
  if (!props.nested) {
    return
  }

  const nestedIds = getNestedIds(item)
  nestedIds
    .filter((id) => id != item.id)
    .forEach((id) => {
      const index = selectedItems.value.indexOf(id)
      if (isChecked) {
        if (index === -1) {
          selectedItems.value.push(id)
        }
      } else {
        selectedItems.value.splice(index, 1)
      }
    })
  emitUpdates(selectedItems.value)
}
</script>
