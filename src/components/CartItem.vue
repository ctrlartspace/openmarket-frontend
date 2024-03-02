<template>
  <div class="flex cursor-pointer text-lg">
    <span
      class="material-icons self-center rounded hover:bg-red-100 hover:text-red-700 active:text-red-700 select-none"
      @click="onRemoveClick"
    >
      remove
    </span>

    <span
      class="ml-2 font-medium flex-auto hover:underline active:underline"
      @click="onItemClick"
    >
      {{ `${item.brand.name}  ${item.name}` }}
    </span>
    <span> 1 шт, {{ item.sellingPrice }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["onRemoveClick"])

const menuItems = ref([
  {
    icon: "mdi-arrow-right",
    title: "Перейти к товару",
  },
  {
    icon: "mdi-close",
    title: "Удалить",
  },
])

const onRemoveClick = () => {
  emit("onRemoveClick", props.item.id)
  console.log("remove item")
}
</script>
