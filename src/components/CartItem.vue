<template>
  <div class="cart-item d-flex">
    <v-icon
      class="align-self-center text-red"
      size="sm"
      icon="mdi-minus"
      @click="onRemoveClick"
    ></v-icon>
    <span class="me-auto ml-2 font-weight-bold">
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

<style scoped>
.cart-item :hover {
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
}
</style>
