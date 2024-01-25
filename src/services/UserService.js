import axios from "@/plugins/axios"

const logIn = async (data) => {
  try {
    const response = await axios.post("/login", data)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { logIn }
