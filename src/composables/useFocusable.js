import { onMounted, onBeforeUnmount, ref, nextTick } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

export function useFocusable() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isDesktop = breakpoints.greater("sm") // only smaller than lg

  const focusableInput = ref(null)
  const setInputFocus = async () => {
    if (focusableInput.value) {
      await nextTick()
      focusableInput.value.focus()
    }
  }
  onMounted(async () => {
    if (isDesktop.value) {
      window.addEventListener("keypress", setInputFocus)
      console.log("add")
    }
  })
  onBeforeUnmount(() => {
    if (isDesktop.value) {
      window.removeEventListener("keypress", setInputFocus)
      console.log("remove")
    }
  })
  return { focusableInput }
}
