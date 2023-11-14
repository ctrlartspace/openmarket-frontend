<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="cart-item d-flex">
        <span class="me-auto">
          <span class="font-weight-bold"> {{ item.title }}, </span>
          {{ item.count }} шт.
        </span>
        <span> {{ item.price }}</span>
      </div>
    </template>
    <v-list class="border elevation-0">
      <v-list-item
        v-for="(item, i) in menuItems"
        :prepend-icon="item.icon"
        @click=""
        :key="i"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { ref } from "vue"

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

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
</script>

<style scoped>
.cart-item :hover {
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
}
</style>
