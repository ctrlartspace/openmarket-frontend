import { onMounted, onUnmounted, onUpdated, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRouteStore } from "@/stores/route.store.js"
import { useSelectStore } from "@/stores/select.store.js"

export function useSelect() {
  const route = useRoute()
  const router = useRouter()
  const isSelectableMode = ref(false)
  const selectedItem = ref(null)

  const routeStore = useRouteStore()
  const selectStore = useSelectStore()

  const applySelect = async (item) => {
    try {
      selectStore.setItem(item)
      const previousRoute = routeStore.previousRoute
      const routeOptions = {
        path: previousRoute.path,
        name: previousRoute.name,
        params: previousRoute.params,
        query: previousRoute.query,
        replace: true,
      }
      await router.replace(routeOptions)
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(async () => {
    isSelectableMode.value = !!route.query.selectableMode
    selectedItem.value = selectStore.selectedItem
  })

  onUpdated(() => {
    selectedItem.value = undefined
    isSelectableMode.value = !!route.query.selectableMode
  })

  onUnmounted(() => {
    if (!isSelectableMode.value) {
      selectStore.resetItem()
    }
  })

  return { isSelectableMode, selectedItem, applySelect }
}
