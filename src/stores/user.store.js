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
    const point = ref(null)

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
        point.value = response.point
        isAuthorizedPoint.value = true
        return Promise.resolve(response)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const logOutFromPoint = () => {
      isAuthorizedPoint.value = false
      point.value = null
      router.push("/store")
    }

    const logOut = () => {
      isAuthorizedStore.value = false
      isAuthorizedPoint.value = false
      point.value = null
      router.push("/auth")
    }

    return {
      isAuthorizedStore,
      isAuthorizedPoint,
      loginToStore,
      loginToStorePoint,
      logOut,
      logOutFromPoint,
      point,
    }
  },
  {
    persist: true,
  }
)
