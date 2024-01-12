<template>
  <div class="flex text-lg cursor-pointer hover:underline">
    <span class="font-semibold">
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
