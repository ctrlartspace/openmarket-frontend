<template>
  <desktop-layout v-if="isDesktop" />
  <mobile-layout v-else />
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import MobileLayout from "@/components/layouts/MobileLayout.vue"
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg

const router = useRouter()

const checkOnline = (e) => {
  const { type } = e
  if (type === "online") {
    router.push("/")
  } else {
    router.push("/no-internet")
  }
}

onMounted(() => {
  if (!navigator.onLine) {
    router.push("/no-internet")
  }
  window.addEventListener("online", checkOnline)
  window.addEventListener("offline", checkOnline)
})

onBeforeUnmount(() => {
  window.removeEventListener("online", checkOnline)
  window.removeEventListener("offline", checkOnline)
})
</script>
