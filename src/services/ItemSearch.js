const BASE_URL = "http://localhost:3000/api"

const getItems = async (queryParams = "") => {
  try {
    const response = await fetch(`${BASE_URL}/items?filters=${queryParams}`, {
      credentials: "include",
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

const getItem = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/items/${code}`, {
      credentials: "include",
    })
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

const addItem = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
const getFilters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/filters`, {
      credentials: "include",
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

const updateItem = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/items/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
    console.log(response)
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
const addFilter = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/filters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

const deleteFilter = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/filters/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

const makeSale = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
const getSales = async (queryParams = "") => {
  try {
    const response = await fetch(`${BASE_URL}/sales?filters=${queryParams}`, {
      credentials: "include",
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

const updateSales = async (data, ids = "") => {
  try {
    const response = await fetch(`${BASE_URL}/sales?ids=${ids}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

const getIncomes = async (queryParams = "") => {
  try {
    const response = await fetch(`${BASE_URL}/incomes?filters=${queryParams}`, {
      credentials: "include",
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
const makeIncome = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/incomes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

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
  getFilters,
  addFilter,
  deleteFilter,
  updateItem,
  addItem,
  makeSale,
  getSales,
  updateSales,
  getIncomes,
  makeIncome,
}
