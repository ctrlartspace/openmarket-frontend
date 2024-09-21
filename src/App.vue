<template>
  <desktop-layout v-if="isDesktop" />
  <mobile-layout v-else />
  <!--    <app-header class="hidden md:flex" />-->
  <!--    <app-header-mobile class="md:hidden" />-->
  <!--    <main class="flex-1 overflow-y-scroll bg-neutral-50">-->
  <!--      <router-view></router-view>-->
  <!--    </main>-->
  <!--    <app-bottom-navigation-bar class="block md:hidden" />-->
  <!-- <desktop-bottom-bar class="hidden md:block" /> -->
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import MobileLayout from "@/components/layouts/MobileLayout.vue"
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"
// import DesktopBottomBar from "@/components/DesktopBottomBar.vue"
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
</script>
