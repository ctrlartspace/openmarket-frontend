import { defineStore } from "pinia"
import { ref } from "vue"

export const useItemState = defineStore("itemState", () => {
  const itemState = ref({})
  const isNewItem = ref(false)

  return {
    itemState,
    isNewItem,
  }
})
