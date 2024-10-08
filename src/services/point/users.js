import axios from "@/plugins/axios"

export const getPointUsers = async (params = {}) => {
  try {
    const response = await axios.get("/point/users", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addPointUser = async (id) => {
  try {
    const response = await axios.post("/point/users", { id })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  getPointUsers,
  addPointUser,
}
