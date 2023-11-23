<template>
  <p>{{ item.item_brand.name }}</p>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    requred: true,
  },
})
</script>
