<template>
  <v-card class="border" variant="elevated" color="success">
    <v-card-text class="d-flex text-white">
      <v-icon
        class="mr-4 align-self-center"
        size="large"
        icon="mdi-cart-outline"
      ></v-icon>
      <span class="text-h5 font-weight-bold me-auto">
        {{ store.getTotalAmount }}
      </span>
      <span class="text-h5 font-weight-bold"> KZT </span>
    </v-card-text>
  </v-card>
  <!--  -->
</template>

<script setup>
import { useCartStore } from "@/stores/cart.store"

const store = useCartStore()
//
</script>

<style scoped>
/*  */
</style>
