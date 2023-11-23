<template>
  <div>
    <base-data-item v-for="(item, i) in items" :item="item" :key="i" />
  </div>
</template>

<script setup>
import BaseDataItem from "@/components/BaseDataItem.vue"
import { ref, onMounted } from "vue"

import { getItems } from "@/services/ItemSearch"

const items = ref([])

onMounted(async () => {
  const response = await getItems()
  items.value = await response.json()
  console.log(items.value)
})
</script>
