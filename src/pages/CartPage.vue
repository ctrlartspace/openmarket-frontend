<template>
  <cart-for-desktop v-if="isDesktop" />
  <cart-for-mobile v-else />
</template>

<script setup>
import CartForMobile from "@/components/CartForMobile.vue"
import CartForDesktop from "@/components/CartForDesktop.vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
// import DesktopBottomBar from "@/components/DesktopBottomBar.vue"
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
</script>
