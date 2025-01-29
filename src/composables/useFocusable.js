import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"

export function useFocusable() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isDesktop = breakpoints.greater("sm") // Only greater than "sm"
  const focusableInput = ref(null)

  const setInputFocus = async () => {
    // Проверяем, есть ли сфокусированный элемент на странице
    if (
      (document.activeElement &&
        document.activeElement !== document.body &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement.tagName,
        )) ||
      document.activeElement.isContentEditable
    ) {
      return
    }
    if (focusableInput.value) {
      await nextTick()
      focusableInput.value.focus()
    }
  }

  const addEventListeners = () => {
    window.addEventListener("keypress", setInputFocus)
  }

  const removeEventListeners = () => {
    window.removeEventListener("keypress", setInputFocus)
  }

  onMounted(() => {
    if (isDesktop.value) {
      addEventListeners()
    }
  })

  watch(isDesktop, (isNowDesktop, wasDesktop) => {
    if (isNowDesktop && !wasDesktop) {
      addEventListeners()
    } else if (!isNowDesktop && wasDesktop) {
      removeEventListeners()
    }
  })

  onBeforeUnmount(() => {
    removeEventListeners()
  })

  return { focusableInput }
}
