import axios from "@/plugins/axios.js"

export const getStoreUser = async (id, params = {}) => {
  try {
    const response = await axios.get("/store/users/" + id, { params })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export default { getStoreUser }
