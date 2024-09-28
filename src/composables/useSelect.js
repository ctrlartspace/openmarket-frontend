import { onMounted, onUpdated, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRouteStore } from "@/stores/route.store.js"

export function useSelect(fetchFunction) {
  const route = useRoute()
  const router = useRouter()
  const isSelectableMode = ref(false)
  const selectedItem = ref(null)

  const routeStore = useRouteStore()

  const applySelect = async (item) => {
    try {
      const previousRoute = routeStore.previousRoute
      const routeOptions = {
        path: previousRoute.path,
        name: previousRoute.name,
        params: previousRoute.params,
        query: previousRoute.query,
        replace: true,
      }
      if (item) {
        routeOptions.query = { ...routeOptions.query, selectedItem: item }
      }
      await router.push(routeOptions)
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(async () => {
    isSelectableMode.value = !!route.query.selectableMode
    const id = route.query.selectedItem

    if (id) {
      selectedItem.value = await fetchFunction(id)
    }
  })

  onUpdated(() => {
    selectedItem.value = undefined
    isSelectableMode.value = !!route.query.selectableMode
  })

  return { isSelectableMode, selectedItem, applySelect }
}
