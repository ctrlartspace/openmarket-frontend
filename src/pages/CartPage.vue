<template>
  <div class="content">
    <v-row>
      <v-col cols="8">
        <v-text-field placeholder="Код товара"></v-text-field>
        <cart-item></cart-item>
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
</script>

<style scoped>
.content {
  margin-top: 90px;
}
</style>
