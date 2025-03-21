import axios from "@/plugins/axios"

export const getStore = async (id) => {
  try {
    const response = await axios.get("/store")
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const getStoreUsers = async (id) => {
  try {
    const response = await axios.get("/store/users")
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const getStorePoint = async () => {
  try {
    const response = await axios.get("/store/point")
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getStorePoints = async (queryParams = "") => {
  try {
    const response = await axios.get("/store/points")
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addStorePoint = async (data) => {
  try {
    const response = await axios.post(`/store/points`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addStoreUser = async (data) => {
  try {
    const response = await axios.post(`/store/users`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addStoreItem = async (data) => {
  try {
    const response = await axios.post(`/store/items`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateStoreItem = async (id, data) => {
  try {
    const response = await axios.put(`/store/items/${id}`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export const getStoreItems = async (params = {}) => {
  try {
    const response = await axios.get("/store/items", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getStoreItem = async (id) => {
  try {
    const response = await axios.get(`/store/items/${id}`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export const addItem = async (data) => {
  try {
    const response = await axios.post(`/store/items`, data)
    return Promise.resolve(response.data.data)
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
  addStoreUser,
  addStoreItem,
  getStoreItems,
  getStoreItem,
  addItem,
  updateStoreItem,
}
