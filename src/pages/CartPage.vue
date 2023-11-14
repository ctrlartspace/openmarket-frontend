<template>
  <div class="content">
    <v-row>
      <v-col cols="8">
        <v-text-field placeholder="Код товара"></v-text-field>
      </v-col>
      <v-col>
        <v-select></v-select>
        <cart-total-value></cart-total-value>
        <!--  -->
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import CartTotalValue from "@/components/CartTotalValue.vue"
</script>

<style scoped>
.content {
  margin-top: 90px;
}
</style>
