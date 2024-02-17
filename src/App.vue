<template>
  <div class="max-w-[800px] mx-auto flex flex-col h-[calc(100dvh)]">
    <app-header class="hidden md:flex p-2 pb-0" />
    <app-header-mobile class="md:hidden" />
    <main class="flex-1 overflow-y-scroll">
      <router-view></router-view>
    </main>
    <app-bottom-navigation-bar class="block md:hidden" />
  </div>
</template>
<script setup>
import AppHeader from "@/components/AppHeader.vue"
import AppHeaderMobile from "@/components/mobile/AppHeaderMobile.vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
</script>
