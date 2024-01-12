const BASE_URL = "http://localhost:3000/api"

const logIn = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      throw new Error("error")
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export { logIn }
