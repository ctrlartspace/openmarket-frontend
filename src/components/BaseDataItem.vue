<template>
  <div class="flex cursor-pointer hover:underline">
    <span class="font-medium">
      {{ `${item.name}` }}
    </span>
    <span class="flex-auto">
      {{
        `${item.brand?.name} ${item.category?.name} ${item.subcategory?.name}`
      }}
    </span>
    <span class=""> {{ item.purchasePrice }}</span>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    requred: true,
  },
})
</script>
