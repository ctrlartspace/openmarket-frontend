import axios from "@/plugins/axios"

export const getWorkShifts = async (params) => {
  try {
    const response = await axios.get("/point/work-shifts", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getWorkShift = async (params) => {
  try {
    const response = await axios.get("/work-shifts/active", { params })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const closeWorkShift = async (id) => {
  try {
    const response = await axios.put("/work-shifts/" + id, {
      isClosed: true,
    })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const openWorkShift = async (startAmount) => {
  try {
    const response = await axios.post("/work-shifts", {
      startAmount,
    })
    return Promise.resolve(response.data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  getWorkShifts,
  getWorkShift,
  closeWorkShift,
  openWorkShift,
}
