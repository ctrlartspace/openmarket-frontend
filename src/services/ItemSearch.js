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

const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`)
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      throw new Error("error")
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const getSubcategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/subcategories`)
    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      throw new Error("error")
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const addBrand = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/brands`, {
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
const addCategory = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
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
const addSubcategory = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/subcategories`, {
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

export {
  getItems,
  getItem,
  getBrands,
  getCategories,
  getSubcategories,
  addBrand,
  addCategory,
  addSubcategory,
}
