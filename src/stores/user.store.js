import { defineStore } from "pinia"
import { ref } from "vue"
import * as UserService from "@/services/UserService"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart.store.js"

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore()
    const isAuthorizedStore = ref(false)
    const isAuthorizedPoint = ref(false)
    const router = useRouter()
    const point = ref(null)
    const permissions = ref([])
    const user = ref(null)

    const hasPermission = (permission) => {
      return permissions.value.includes(permission)
    }

    const loginToStore = async (data) => {
      try {
        const response = await UserService.loginToStore(data)
        permissions.value = response.permissions || []
        user.value = response.user
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
        user.value = response.user
        isAuthorizedPoint.value = true
        return Promise.resolve(response)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const logOutFromPoint = async () => {
      await UserService.logoutFromPoint()
      isAuthorizedPoint.value = false
      point.value = null
      cartStore.clearCart()
      await router.push("/store")
    }

    const logOut = async () => {
      await UserService.logoutFromStore()
      isAuthorizedStore.value = false
      isAuthorizedPoint.value = false
      point.value = null
      permissions.value = []
      user.value = null
      cartStore.clearCart()
      await router.push("/auth")
    }

    return {
      isAuthorizedStore,
      isAuthorizedPoint,
      loginToStore,
      loginToStorePoint,
      logOut,
      logOutFromPoint,
      hasPermission,
      point,
      permissions,
      user,
    }
  },
  {
    persist: true,
  },
)
