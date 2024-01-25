import axios from "@/plugins/axios"

const getCashes = async (queryParams = "") => {
  try {
    const response = await axios.get(`/cashes?filters=${queryParams}`)
    console.log(response)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getCashes }
