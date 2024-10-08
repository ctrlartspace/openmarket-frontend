import axios from "@/plugins/axios.js"

export const makeSale = async (data) => {
  try {
    const response = await axios.post(`/sales`, data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getSales = async (params = {}) => {
  try {
    const response = await axios.get("/sales", { params })
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

export default { makeSale, getSales, updateSales }
