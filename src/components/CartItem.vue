<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="cart-item d-flex">
        <v-icon
          class="align-self-center text-red"
          size="sm"
          icon="mdi-minus"
        ></v-icon>
        <span class="me-auto ml-2 font-weight-bold">
          {{ `${item.brand} ${item.model}` }}
        </span>
        <span> 1 шт, {{ item.price }}</span>
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
