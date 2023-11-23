const getItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/items")
    if (response.ok) {
      return Promise.resolve(response)
    } else {
      throw new Error("error")
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const getItem = async (code) => {
  try {
    const response = await fetch(`http://localhost:3000/api/items/${code}`)
    if (response.ok) {
      return Promise.resolve(response)
    } else {
      throw new Error("error")
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export { getItems, getItem }
