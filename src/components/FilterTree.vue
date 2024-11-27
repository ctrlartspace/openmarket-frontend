<template>
  <ul
    v-if="firstItems.length > 0"
    class="overflow-auto rounded-xl border border-neutral-100"
  >
    <li
      v-for="(item, i) in firstItems"
      :key="i"
      class="border-t border-neutral-100 first:border-none"
    >
      <filter-item
        :key="item.id"
        v-model="selectedItems"
        :is-expand="item.subVisible"
        :item="item"
        :select-root="selectRoot"
        :showExpand="item.items && item.items.length > 0"
        class="pl-4"
        @change="selectChilds(item, $event.target.checked)"
        @on-expand-toggle="(v) => (item.subVisible = v)"
      />
      <ul v-if="item.subVisible">
        <li v-for="(subitem, i) in item.items" :key="i" class="border-t">
          <filter-item
            :key="subitem.id"
            v-model="selectedItems"
            :is-expand="subitem.subVisible"
            :item="subitem"
            :select-root="selectRoot"
            :showExpand="subitem.items && subitem.items.length > 0"
            class="pl-6"
            @change="selectChilds(subitem, $event.target.checked)"
            @on-expand-toggle="(v) => (subitem.subVisible = v)"
          />
          <ul v-if="subitem.subVisible">
            <li
              v-for="(subsubitem, i) in subitem.items"
              :key="i"
              class="border-t"
            >
              <filter-item
                :key="subsubitem.id"
                v-model="selectedItems"
                :is-expand="subsubitem.subVisible"
                :item="subsubitem"
                :select-root="selectRoot"
                :showExpand="subsubitem.items && subsubitem.items.length > 0"
                class="pl-8"
                @change="selectChilds(subsubitem, $event.target.checked)"
                @on-expand-toggle="(v) => (subsubitem.subVisible = v)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </li>

    <li v-if="isItemsMore" class="border-t">
      <button
        class="flex w-full items-center justify-center px-4 py-3 text-start hover:bg-gray-50 active:bg-gray-50"
        @click="isShowFull = !isShowFull"
      >
        <span class="material-symbols-rounded">{{
          isShowFull ? "expand_less" : "expand_more"
        }}</span>
      </button>
    </li>
  </ul>
  <div
    v-else
    class="rounded-xl border border-neutral-100 bg-white px-4 py-3 text-center"
  >
    <span class="text-neutral-300">Категории не найдены</span>
  </div>
</template>

<script setup>
import FilterItem from "@/components/FilterItem.vue"
import { computed, ref } from "vue"

const props = defineProps([
  "items",
  "single",
  "nested",
  "selectRoot",
  "modelValue",
])
const emit = defineEmits(["change", "update:modelValue"])

const VISIBLE_ITEMS_COUNT = 3
const isShowFull = ref(true)
const mainItems = computed(() => props.items.filter((item) => !item.parentId))
const isItemsMore = computed(() => mainItems.value.length > VISIBLE_ITEMS_COUNT)
const visibleItemsCount = computed(() =>
  isShowFull.value ? mainItems.value.length : VISIBLE_ITEMS_COUNT,
)
const firstItems = computed(() =>
  mainItems.value.slice(0, visibleItemsCount.value),
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
