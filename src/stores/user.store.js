import { defineStore } from "pinia"
import { ref, computed } from "vue"
import * as UserService from "@/services/UserService"

export const useUserStore = defineStore("user", () => {
  const accessToken = computed(() => localStorage.getItem("access_token"))
  const isAuthorized = computed(() => accessToken.value !== null)

  const logIn = async (data) => {
    const response = await UserService.logIn(data)
    localStorage.setItem("access_token", response.accessToken)
  }

  const logOut = () => {
    localStorage.removeItem("access_token")
  }

  return { isAuthorized, logIn, logOut }
})
