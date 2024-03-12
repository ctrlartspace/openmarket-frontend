<template>
  <div class="relative max-w-[800px] mx-auto flex flex-col h-[calc(100dvh)]">
    <app-header class="hidden md:flex p-2 pb-0" />
    <app-header-mobile class="md:hidden" />
    <main class="flex-1 overflow-y-scroll">
      <router-view></router-view>
    </main>
    <app-bottom-navigation-bar class="block md:hidden" />
    <!-- <desktop-bottom-bar class="hidden md:block" /> -->
  </div>
</template>
<script setup>
import AppHeader from "@/components/AppHeader.vue"
import AppHeaderMobile from "@/components/mobile/AppHeaderMobile.vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
// import DesktopBottomBar from "@/components/DesktopBottomBar.vue"
</script>
