import axios from "@/plugins/axios"

const loginToStore = async (data) => {
  try {
    const response = await axios.post("/login/store", data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const loginToStorePoint = async (id) => {
  try {
    const response = await axios.post("/login/point/", { pointId: id })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const logoutFromStore = async () => {
  try {
    const response = await axios.post("/logout/store")
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const logoutFromPoint = async () => {
  try {
    const response = await axios.post("/logout/point/")
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { loginToStore, loginToStorePoint, logoutFromStore, logoutFromPoint }
