import { onMounted, onUpdated, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRouteStore } from "@/stores/route.store.js"

export function useScan() {
  const route = useRoute()
  const router = useRouter()
  const isScannableMode = ref(false)
  const scannedCode = ref(null)

  const routeStore = useRouteStore()

  const applyScan = async (item) => {
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
        routeOptions.query = { ...routeOptions.query, scannedCode: item }
      }
      await router.push(routeOptions)
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(async () => {
    isScannableMode.value = !!route.query.scannableMode
    scannedCode.value = route.query.scannedCode
  })

  onUpdated(() => {
    scannedCode.value = undefined
    isScannableMode.value = !!route.query.scannableMode
  })

  return { isScannableMode, scannedCode, applyScan }
}
