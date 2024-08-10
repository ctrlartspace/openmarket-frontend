import axios from "@/plugins/axios"

export const getStore = async (id) => {
  try {
    const response = await axios.get("/store")
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const getStoreUsers = async (id) => {
  try {
    const response = await axios.get("/store/users")
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const getStorePoint = async () => {
  try {
    const response = await axios.get("/store/point")
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getStorePoints = async (queryParams = "") => {
  try {
    const response = await axios.get("/store/points")
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addStorePoint = async (data) => {
  try {
    const response = await axios.post(`/store/points`, data)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getStoreItems = async (queryParams = "") => {
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

export default {
  getStore,
  getStorePoint,
  getStoreUsers,
  getStorePoints,
  addStorePoint,
  getStoreItems,
  getItem,
  addItem,
}
