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

  delete(url, data = {}) {
    return axiosClient.delete(url, { data })
  },
}

export default apiService
