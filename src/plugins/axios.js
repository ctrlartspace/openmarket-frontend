import axiosInstance from "axios"
import { useUserStore } from "@/stores/user.store"

const axiosClient = axiosInstance.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  async (error) => {
    if (!error.response) {
      console.error(error)
      return
    }
    if (error.response.status === 400) {
      console.error(error)
    } else if (error.response.status === 401) {
      const store = useUserStore()
      if (error.response.data.type && error.response.data.type === "store") {
        await store.logOut()
        return
      }
      if (error.response.data.type && error.response.data.type === "point") {
        await store.logOutFromPoint()
        return
      }
      await store.logOut()
    } else if (error.response.status === 403) {
      console.error(error)
    } else {
      console.error(error)
    }

    return Promise.reject(error)
  },
)

export default axiosClient
