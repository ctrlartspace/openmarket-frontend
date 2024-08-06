import axios from "@/plugins/axios"

export const getStorePoints = async (queryParams = "") => {
  try {
    const response = await axios.get("/store/points")
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getItems = async (queryParams = "") => {
  try {
    const response = await axios.get(`/store/items?filters=${queryParams}`)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getItem = async (code) => {
  try {
    const response = await axios.get(`/store/items/${code}`)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export const addItem = async (data) => {
  try {
    const response = await axios.post(`/store/items`, data)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default { getStorePoints, getItems, getItem, addItem }
