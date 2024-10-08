import axios from "@/plugins/axios"

const getItems = async (queryParams = "") => {
  try {
    const response = await axios.get(`/items?filters=${queryParams}`)
    console.log(response)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getPointItem = async (code) => {
  try {
    const response = await axios.get(`/items/${code}`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

const addItem = async (data) => {
  try {
    const response = await axios.post(`/items`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getFilters = async () => {
  try {
    const response = await axios.get(`/filters`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const updateItem = async (data) => {
  try {
    const response = await axios.put(`/items/${data.id}`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

const addFilter = async (data) => {
  try {
    const response = await axios.post(`/filters`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const deleteFilter = async (id) => {
  try {
    const response = await axios.delete(`/filters/${id}`)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

const makeSale = async (data) => {
  try {
    const response = await axios.post(`/sales`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getSales = async (queryParams = "") => {
  try {
    const response = await axios.get(`/sales?filters=${queryParams}`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const updateSales = async (data, ids = "") => {
  try {
    const response = await axios.put(`/sales?ids=${ids}`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getIncomes = async (queryParams = "") => {
  try {
    const response = await axios.get(`/incomes?fitlers=${queryParams}`)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const makeIncome = async (data) => {
  try {
    const response = await axios.post(`/incomes`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  getItems,
  getPointItem,
  getFilters,
  addFilter,
  deleteFilter,
  updateItem,
  addItem,
  makeSale,
  getSales,
  updateSales,
  getIncomes,
  makeIncome,
}
