import axios from "@/plugins/axios"

export const getCashRegisters = async (params) => {
  try {
    const response = await axios.get("cash-registers", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getActiveCash = async (params) => {
  try {
    const response = await axios.get("/cash-registers/active", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const closeCashRegister = async (id) => {
  try {
    const response = await axios.put("/cash-registers/" + id, {
      isClosed: true,
    })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const openCashRegister = async (startAmount) => {
  try {
    const response = await axios.post("/cash-registers", {
      startAmount,
    })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  getCashRegisters,
  getActiveCash,
  closeCashRegister,
  openCashRegister,
}
