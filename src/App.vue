<template>
  <router-view />
  <a-message-modal />
  <a-update-dialog />
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue"
import { useOnlineStore } from "@/stores/online.store.js"
import { useThemeStore } from "@/stores/theme.store.js"
import AMessageModal from "@/components/ui/AMessageModal.vue"
import AUpdateDialog from "@/components/ui/AUpdateDialog.vue"

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
