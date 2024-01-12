import { defineStore } from "pinia"
import { ref, computed } from "vue"
import * as UserService from "@/services/UserService"

export const useUserStore = defineStore("user", () => {
  const accessToken = computed(() => localStorage.getItem("access_token"))
  const isAuthorized = computed(() => accessToken.value !== null)

  const logIn = async (data) => {
    await UserService.logIn(data)
    console.log("login")
  }

  const logOut = () => {
    localStorage.removeItem("access_token")
  }

  return { isAuthorized, logIn, logOut }
})
