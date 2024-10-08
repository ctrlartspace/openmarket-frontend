import axios from "@/plugins/axios"

export const addPointItem = async (data) => {
  try {
    const response = await axios.post(`/point/items`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default { addPointItem }
