import { onMounted, onBeforeUnmount, ref, nextTick } from "vue"

export function useFocusable() {
  const focusableInput = ref(null)
  const setInputFocus = async () => {
    if (focusableInput.value) {
      await nextTick()
      focusableInput.value.focus()
    }
  }
  onMounted(async () => {
    window.addEventListener("keypress", setInputFocus)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("keypress", setInputFocus)
  })
  return { focusableInput }
}
