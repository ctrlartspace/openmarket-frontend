<template>
  <div>
    <div class="block md:hidden">
      <cart-for-mobile />
    </div>
    <div class="hidden md:block">
      <cart-for-desktop />
    </div>
  </div>
</template>

<script setup>
import CartForMobile from "@/components/CartForMobile.vue"
import CartForDesktop from "@/components/CartForDesktop.vue"
</script>
