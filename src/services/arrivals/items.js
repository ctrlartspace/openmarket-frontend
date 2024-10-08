import axios from "@/plugins/axios.js"

export const getArrivalItems = async (params) => {
  try {
    const response = await axios.get("/incomes", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const addArrivalItem = async (data) => {
  try {
    const response = await axios.post("/arrivals", data)
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default { getArrivalItems, addArrivalItem }
