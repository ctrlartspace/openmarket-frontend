import { defineStore } from "pinia"
import { ref } from "vue"
import * as UserService from "@/services/UserService"
import { useRouter } from "vue-router"

export const useUserStore = defineStore("user", () => {
  const isAuthorizedStore = ref(localStorage.getItem("isAuthorizedStore"))
  const isAuthorizedPoint = ref(localStorage.getItem("isAuthorizedPoint"))
  const router = useRouter()

  const loginToStore = async (data) => {
    try {
      const response = await UserService.loginToStore(data)
      localStorage.setItem("isAuthorizedStore", true)
      isAuthorizedStore.value = true
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const loginToStorePoint = async (id) => {
    try {
      const response = await UserService.loginToStorePoint(id)
      localStorage.setItem("isAuthorizedPoint", true)
      isAuthorizedPoint.value = true
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logOut = () => {
    localStorage.removeItem("isAuthorizedStore")
    localStorage.removeItem("isAuthorizedPoint")
    isAuthorizedStore.value = false
    isAuthorizedPoint.value = false
    router.push("/auth")
  }

  return {
    isAuthorizedStore,
    isAuthorizedPoint,
    loginToStore,
    loginToStorePoint,
    logOut,
  }
})
