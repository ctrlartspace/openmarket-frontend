import { defineStore } from "pinia"
import { ref, computed } from "vue"
import * as UserService from "@/services/UserService"
import { useRouter } from "vue-router"

export const useUserStore = defineStore("user", () => {
  const isAuthorized = ref(localStorage.getItem("isAuthorized"))
  const router = useRouter()

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
