<template>
  <div class="flex cursor-pointer text-lg">
    <span
      class="material-icons self-center rounded hover:bg-red-100 hover:text-red-700"
      @click="onRemoveClick"
    >
      remove
    </span>

    <span
      class="ml-2 font-semibold flex-auto hover:underline"
      @click="onItemClick"
    >
      {{ `${item.brand} ${item.model}` }}
    </span>
    <span> 1 шт, {{ item.price }}</span>
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
