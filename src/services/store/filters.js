import axios from "@/plugins/axios.js"

export const getStoreFilters = async () => {
  try {
    const response = await axios.get(`/filters`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default { getStoreFilters }
