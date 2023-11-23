const BASE_URL = "http://localhost:3000/api"

const getItems = async (queryParams = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/items?${queryParams}`)
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      throw new Error("error")
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const getItem = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/items/${code}`)
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      throw new Error("error")
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

const getBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/brands`)
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      throw new Error("error")
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getItems, getItem, getBrands }
