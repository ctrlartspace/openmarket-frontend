import { defineStore } from "pinia"
import { ref } from "vue"
import * as UserService from "@/services/UserService"
import { useRouter } from "vue-router"

export const useUserStore = defineStore(
  "user",
  () => {
    const isAuthorizedStore = ref(false)
    const isAuthorizedPoint = ref(false)
    const router = useRouter()
    const storePoint = ref(null)

    const loginToStore = async (data) => {
      try {
        const response = await UserService.loginToStore(data)
        isAuthorizedStore.value = true
        return Promise.resolve(response)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    const loginToStorePoint = async (id) => {
      try {
        const response = await UserService.loginToStorePoint(id)
        storePoint.value = response.storePoint
        isAuthorizedPoint.value = true
        return Promise.resolve(response)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const logOut = () => {
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
      storePoint,
    }
  },
  {
    persist: true,
  }
)
