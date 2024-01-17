import { defineStore } from "pinia"
import { ref, computed } from "vue"
import * as UserService from "@/services/UserService"

export const useUserStore = defineStore("user", () => {
  const isAuthorized = computed(() => localStorage.getItem("isAuthorized"))

  const logIn = async (data) => {
    const response = await UserService.logIn(data)
    localStorage.setItem("isAuthorized", true)
  }

  const logOut = () => {
    localStorage.removeItem("isAuthorized")
  }

  return { isAuthorized, logIn, logOut }
})
