import { breakpointsTailwind, isDef, useBreakpoints } from "@vueuse/core"

export default {
  mounted(el) {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isDesktop = breakpoints.greater("sm") // only smaller than lg
    // if (isDesktop.value) {
    //   el.focus()
    // }
    el.focus()
  },
}
