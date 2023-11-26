<template>
  <div class="flex text-lg cursor-pointer hover:underline">
    <span class="font-semibold">
      {{ `${item.item_name}` }}
    </span>
    <span class="flex-auto">
      {{
        `${item.item_brand.name} ${item.item_category.name} ${item.item_subcategory.name}`
      }}
    </span>
    <span class=""> {{ item.item_purchase_price }}</span>
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
