import { defineStore } from "pinia"
import { ref } from "vue"

export const useSelectStore = defineStore("selectStore", () => {
  const selectedItem = ref(null)

  const setItem = (item) => {
    selectedItem.value = item
  }
  const resetItem = () => {
    selectedItem.value = null
  }

  return {
    selectedItem,
    setItem,
    resetItem,
  }
})
