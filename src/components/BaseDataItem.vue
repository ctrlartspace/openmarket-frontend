<template>
  <p>{{ item.item_name }}</p>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    requred: true,
  },
})
</script>
