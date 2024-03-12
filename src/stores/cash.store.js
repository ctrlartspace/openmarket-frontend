import { defineStore } from "pinia"
import * as UserService from "@/services/UserService"

export const useUserStore = defineStore("user", () => {
  const logIn = async (data) => {
    const response = await UserService.logIn(data)
    localStorage.setItem("isAuthorized", true)
    isAuthorized.value = true
  }

  const logOut = () => {
    localStorage.removeItem("isAuthorized")
    isAuthorized.value = false
    router.push("/auth")
  }

  return { isAuthorized, logIn, logOut }
})
