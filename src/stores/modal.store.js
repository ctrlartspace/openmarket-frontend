import { defineStore } from "pinia"
import { ref } from "vue"

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false)
  const title = ref("Ошибка")
  const message = ref("")

  function show(titleText, messageText) {
    title.value = titleText
    message.value = messageText
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, title, message, show, close }
})
