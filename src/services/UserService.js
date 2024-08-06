import axios from "@/plugins/axios"

const loginToStore = async (data) => {
  try {
    const response = await axios.post("/login/store", data)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const loginToStorePoint = async (id) => {
  try {
    const response = await axios.post("/login/point/", { storePointId: id })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getProfile = async () => {
  try {
    const response = await axios.get("/profile")
    return Promise.resolve(response.data)
  } catch (error) {}
}

export { loginToStore, loginToStorePoint, getProfile }
