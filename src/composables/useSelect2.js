import { onMounted, onUnmounted, onUpdated, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRouteStore } from "@/stores/route.store.js"
import { useSelectStore } from "@/stores/select.store.js"

export function useSelect() {
  const route = useRoute()
  const router = useRouter()
  const isSelectableMode = ref(false)
  const selectedItem = ref(null)
  const nextPath = ref(null)

  const routeStore = useRouteStore()
  const selectStore = useSelectStore()

  const applySelect = async (item, nextPathDirect = nextPath.value) => {
    try {
      isSelectableMode.value = true
      selectStore.setItem(item)
      if (nextPathDirect) {
        await router.replace({ path: String(nextPathDirect), push: true })
        return
      }

      const previousRoute = routeStore.previousRoute
      const routeOptions = {
        path: nextPath.value || previousRoute.path,
        name: previousRoute.name,
        params: previousRoute.params,
        query: previousRoute.query,
        replace: true,
      }
      console.log(routeOptions)
      await router.push(routeOptions)
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(async () => {
    isSelectableMode.value = !!route.query.selectableMode

    nextPath.value = route.query.nextPath
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
