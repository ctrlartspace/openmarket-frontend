import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import StoreService from "@/services/StoreService.js"

export function useStoreItem() {
  const route = useRoute()
  const storeItem = ref(null)
  const isStoreItemLoading = ref(false)

  const getStoreItem = async (id) => {
    try {
      isStoreItemLoading.value = true
      storeItem.value = await StoreService.getStoreItem(id)
    } catch (error) {
      console.error(error)
    } finally {
      isStoreItemLoading.value = false
    }
  }

  onMounted(async () => {
    const routeStoreItem = route.query.storeItem
    if (routeStoreItem) {
      try {
        await getStoreItem(routeStoreItem)
      } catch (error) {
        console.log(error)
      }
    }
  })

  return { storeItem, isStoreItemLoading }
}
