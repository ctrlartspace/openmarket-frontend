import axios from "@/plugins/axios"

export const getPointItems = async (params) => {
  try {
    const response = await axios.get("/point/items", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getPointItem = async (id, params = {}) => {
  try {
    const response = await axios.get(`/point/items/${id}`, { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export const addItem = async (data) => {
  try {
    const response = await axios.post(`/point/items`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addItemsMany = async (data) => {
  try {
    const response = await axios.post(`/point/items/many`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getFilters = async () => {
  try {
    const response = await axios.get(`/filters`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updatePointItem = async (id, data) => {
  try {
    const response = await axios.put(`/point/items/${id}`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export const addFilter = async (data) => {
  try {
    const response = await axios.post(`/filters`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteFilter = async (id) => {
  try {
    const response = await axios.delete(`/filters/${id}`)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const makeSale = async (data) => {
  try {
    const response = await axios.post(`/sales`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getSales = async (queryParams = "") => {
  try {
    const response = await axios.get(`/sales?filters=${queryParams}`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateSales = async (data, ids = "") => {
  try {
    const response = await axios.put(`/sales?ids=${ids}`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getIncomes = async (queryParams = "") => {
  try {
    const response = await axios.get(`/incomes?fitlers=${queryParams}`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const makeIncome = async (data) => {
  try {
    const response = await axios.post(`/incomes`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  getPointItems,
  getPointItem,
  addItem,
  addItemsMany,
  addFilter,
  deleteFilter,
  getFilters,
  updatePointItem,
}
