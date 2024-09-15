import { defineStore } from "pinia"
import { ref } from "vue"

export const useRouteStore = defineStore(
  "route",
  () => {
    const previousRoute = ref({ path: "/" })

    const setPreviousRoute = (route) => {
      previousRoute.value.path = route.path
      previousRoute.value.name = route.name
      previousRoute.value.query = route.query
      previousRoute.value.params = route.params
    }

    return {
      previousRoute,
      setPreviousRoute,
    }
  },
  {
    persist: true,
  },
)
