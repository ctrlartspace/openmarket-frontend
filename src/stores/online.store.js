import { defineStore } from "pinia"
import { ref } from "vue"

export const useOnlineStore = defineStore(
  "online",
  () => {
    const isOnline = ref(true)

    const setOnline = () => {
      isOnline.value = true
    }
    const setOffline = () => {
      isOnline.value = false
    }

    return {
      isOnline,
      setOnline,
      setOffline,
    }
  },
  {
    persist: true,
  },
)
