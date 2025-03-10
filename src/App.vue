<template>
  <desktop-layout v-if="isDesktop" />
  <mobile-layout v-else />
  <AMessageModal />
  <AUpdateDialog />
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { onBeforeUnmount, onMounted } from "vue"
import MobileLayout from "@/components/layouts/MobileLayout.vue"
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"
import { useOnlineStore } from "@/stores/online.store.js"
import AMessageModal from "@/components/ui/AMessageModal.vue"
import { useThemeStore } from "@/stores/theme.store.js"
import AUpdateDialog from "@/components/ui/AUpdateDialog.vue"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm")

const onlineStore = useOnlineStore()
const themeStore = useThemeStore()

const checkOnline = (e) => {
  const { type } = e
  if (type === "online") {
    onlineStore.setOnline()
  } else {
    onlineStore.setOffline()
  }
}

onMounted(() => {
  themeStore.initializeTheme()

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
