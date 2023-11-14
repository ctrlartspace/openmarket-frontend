<template>
  <div class="content">
    <v-row>
      <v-col cols="8">
        <v-text-field placeholder="Код товара"></v-text-field>
        <cart-item v-for="(item, i) in items" :item="item" @click="" :key="i" />
      </v-col>
      <v-col>
        <v-select></v-select>
        <cart-total-value @click=""></cart-total-value>
        <!--  -->
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import CartItem from "@/components/CartItem.vue"
import CartTotalValue from "@/components/CartTotalValue.vue"

import { ref } from "vue"

const items = ref([
  {
    code: 123124124,
    title: "Кабель Borofone ZX 2000",
    count: 2,
    price: 2000,
  },
  {
    code: 325436346,
    title: "ЗУ Hoco TX 23",
    count: 2,
    price: 1500,
  },
])
</script>

<style scoped>
.content {
  margin-top: 90px;
}
</style>
