import { nextTick } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

export default {
  async beforeMount(el) {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isDesktop = breakpoints.greater("sm") // only smaller than lg

    const setInputFocus = async () => {
      await nextTick()

      el.focus()
      console.log(el)
    }

    if (isDesktop.value) {
      el.__inputFocusListener = setInputFocus
      window.addEventListener("keypress", setInputFocus)
    }
  },

  beforeUnmount(el) {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isDesktop = breakpoints.greater("sm") // only smaller than lg
    if (isDesktop.value) {
      console.log("remove : ", el.__inputFocusListener)
      window.removeEventListener("keypress", el.__inputFocusListener)
    }
  },
}
