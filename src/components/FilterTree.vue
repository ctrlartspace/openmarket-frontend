<template>
  <ul>
    <li v-for="item in firstItems">
      <filter-item
        v-model="selectedItems"
        :item="item"
        :showExpand="item.items && item.items.length > 0"
        @on-expand-toggle="(v) => (item.subVisible = v)"
        :key="item.id"
      />
      <ul v-if="item.subVisible">
        <li v-for="subitem in item.items">
          <filter-item
            class="pl-6"
            v-model="selectedSubitems"
            :item="subitem"
            :showExpand="subitem.items && subitem.items.length > 0"
            @on-expand-toggle="(v) => (subitem.subVisible = v)"
            :key="subitem.id"
          />
          <ul v-if="subitem.subVisible">
            <li v-for="subsubitem in subitem.items">
              <filter-item
                class="pl-8"
                v-model="selectedSubsubitems"
                :item="subsubitem"
                :showExpand="subsubitem.items && subsubitem.items.length > 0"
                :key="subsubitem.id"
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

const props = defineProps(["items", "modelValue"])
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
const selectedSubitems = ref([])
const selectedSubsubitems = ref([])

const updateModelValue = () => {
  const items = selectedItems.value.concat(
    selectedSubitems.value,
    selectedSubsubitems.value
  )
  emit("update:modelValue", items)
}

watch(selectedItems, updateModelValue)
watch(selectedSubitems, updateModelValue)
watch(selectedSubsubitems, updateModelValue)
</script>
