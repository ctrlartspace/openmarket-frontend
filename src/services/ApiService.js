import axiosClient from "@/plugins/axios"

const apiService = {
  get(url, params = {}) {
    return axiosClient.get(url, { params })
  },

  post(url, data) {
    return axiosClient.post(url, data)
  },

  put(url, data) {
    return axiosClient.put(url, data)
  },

  delete(url) {
    return axiosClient.delete(url)
  },
}

export default apiService
