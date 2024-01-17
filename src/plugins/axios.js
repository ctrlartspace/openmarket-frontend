import axiosInstance from "axios"
import { useUserStore } from "@/stores/user.store"

console.log(import.meta.env)
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
  (error) => {
    if (!error.response) {
      console.error(error)
      return
    }
    if (error.response.status === 400) {
      console.error(error)
    } else if (error.response.status === 401) {
      const store = useUserStore()
      store.logOut()
    } else if (error.response.status === 403) {
      console.error(error)
    } else {
      console.error(error)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
