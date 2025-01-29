<template>
  <desktop-layout v-if="isDesktop" />
  <mobile-layout v-else />
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { onBeforeUnmount, onMounted } from "vue"
import MobileLayout from "@/components/layouts/MobileLayout.vue"
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"
import { useOnlineStore } from "@/stores/online.store.js"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

const onlineStore = useOnlineStore()

const checkOnline = (e) => {
  const { type } = e
  if (type === "online") {
    onlineStore.setOnline()
  } else {
    onlineStore.setOffline()
  }
}

onMounted(() => {
  if (!navigator.onLine) {
    onlineStore.setOffline()
  }
  window.addEventListener("online", checkOnline)
  window.addEventListener("offline", checkOnline)
})

onBeforeUnmount(() => {
  window.removeEventListener("online", checkOnline)
  window.removeEventListener("offline", checkOnline)
})
</script>
