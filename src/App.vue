<template>
  <div class="max-w-[800px] mx-auto">
    <header class="">
      <app-header class="hidden md:flex p-2 pb-0" />
      <app-header-mobile class="md:hidden sticky" />
    </header>
    <main class="md:p-2 h-full">
      <router-view></router-view>
    </main>
    <app-bottom-navigation-bar />
  </div>
</template>
<script setup>
import AppHeader from "@/components/AppHeader.vue"
import AppHeaderMobile from "@/components/mobile/AppHeaderMobile.vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
</script>
