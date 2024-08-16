import axios from "@/plugins/axios"

export const getPointFilters = async () => {
  try {
    const response = await axios.get(`/filters`)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default { getPointFilters }
