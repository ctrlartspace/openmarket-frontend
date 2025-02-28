import { defineStore } from "pinia"
import { ref } from "vue"

export const useThemeStore = defineStore("themeStore", () => {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle("dark", isDark.value)
    localStorage.setItem("darkMode", isDark.value)
    updateStatusBar() // Обновляем статус-бар при переключении
  }

  const initializeTheme = () => {
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode === "true") {
      isDark.value = true
      document.documentElement.classList.add("dark")
    } else {
      isDark.value = false
      document.documentElement.classList.remove("dark")
    }
    updateStatusBar() // Инициализируем статус-бар
  }
  const updateStatusBar = () => {
    const appleStatusBar = document.querySelector("#apple-status-bar")
    const themeColor = document.querySelector("#theme-color")

    if (isDark.value) {
      if (appleStatusBar)
        appleStatusBar.setAttribute("content", "black-translucent")
      if (themeColor) themeColor.setAttribute("content", "#171717") // Чёрный фон
    } else {
      if (appleStatusBar) appleStatusBar.setAttribute("content", "default")
      if (themeColor) themeColor.setAttribute("content", "#ffffff") // Белый фон
    }
  }

  return {
    isDark,
    toggleTheme,
    initializeTheme,
  }
})
