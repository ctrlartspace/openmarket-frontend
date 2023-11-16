import { items } from "@/utils/db"

const getItems = (code) => {
  const resultItems = items.filter((item) => {
    return (
      String(item.code).toLowerCase().includes(String(code).toLowerCase()) ||
      String(item.model).toLowerCase().includes(String(code).toLowerCase()) ||
      String(item.brand).toLowerCase().includes(String(code).toLowerCase())
    )
  })

  return resultItems
}

export { getItems }
