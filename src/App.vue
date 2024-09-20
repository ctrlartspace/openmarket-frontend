<template>
  <desktop-layout class="hidden md:flex" />
  <mobile-layout class="block md:hidden" />
  <!--    <app-header class="hidden md:flex" />-->
  <!--    <app-header-mobile class="md:hidden" />-->
  <!--    <main class="flex-1 overflow-y-scroll bg-neutral-50">-->
  <!--      <router-view></router-view>-->
  <!--    </main>-->
  <!--    <app-bottom-navigation-bar class="block md:hidden" />-->
  <!-- <desktop-bottom-bar class="hidden md:block" /> -->
</template>
<script setup>
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"
import MobileLayout from "@/components/layouts/MobileLayout.vue"
// import DesktopBottomBar from "@/components/DesktopBottomBar.vue"
</script>
