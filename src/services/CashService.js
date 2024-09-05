import axios from "@/plugins/axios"

export const getCashes = async (queryParams = "") => {
  try {
    const response = await axios.get(`/cashes?filters=${queryParams}`)
    console.log(response)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getActiveCash = async (params) => {
  try {
    const response = await axios.get("/cash-registers/active", { params })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const closeCashRegister = async (id) => {
  try {
    const response = await axios.put("/cash-registers/" + id, {
      isClosed: true,
    })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const openCashRegister = async (startAmount) => {
  try {
    const response = await axios.post("/cash-registers", {
      startAmount,
    })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default { getCashes, getActiveCash, closeCashRegister, openCashRegister }
