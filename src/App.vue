<template>
  <desktop-layout v-if="isDesktop" />
  <mobile-layout v-else />
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import MobileLayout from "@/components/layouts/MobileLayout.vue"
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
</script>
