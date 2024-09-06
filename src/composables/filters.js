import { computed, onMounted, onUpdated, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRouteStore } from "@/stores/route.store.js"
import { getStoreFilters } from "@/services/store/filters.js"

export function useFilters() {
  const routeStore = useRouteStore()
  const route = useRoute()
  const router = useRouter()

  const filters = ref(undefined)
  const isSingle = ref(true)
  const isFilterMode = ref(false)
  const filterItems = ref([])

  const applyFilters = () => {
    try {
      const previousRoute = routeStore.previousRoute
      const rawFilters = JSON.stringify(filters.value)
      const routeOptions = {
        name: previousRoute.name,
        params: previousRoute.params,
        query: previousRoute.query,
        replace: true,
      }
      if (rawFilters) {
        routeOptions.query = { ...routeOptions.query, filters: rawFilters }
      }
      router.push(routeOptions)
    } catch (error) {
      console.log(error)
    }
  }

  const resetFilters = () => {
    filters.value = undefined
  }

  onMounted(async () => {
    const routeFilters = route.query.filters
    if (routeFilters) {
      filters.value = JSON.parse(routeFilters)
    }

    const single = route.query.single
    if (single) {
      isSingle.value = JSON.parse(single)
    }

    isFilterMode.value = !!route.query.filterMode
    filterItems.value = await getStoreFilters()
  })

  onUpdated(() => {
    filters.value = undefined
    isFilterMode.value = !!route.query.filterMode
  })

  const selectedFiltersLength = computed(() =>
    filters.value instanceof Array ? filters.value.length : 1,
  )
  const joinedFilters = computed(() =>
    filters.value instanceof Array ? filters.value.join(",") : filters.value,
  )

  const filterPath = computed(() => ({
    path: "/store/filters",
    query: { filters: JSON.stringify(filters.value), filterMode: true },
  }))
  const filterPathMulti = computed(() => ({
    path: "/store/filters",
    query: {
      filters: JSON.stringify(filters.value),
      single: false,
      filterMode: true,
    },
  }))
  const filterPathSingle = computed(() => ({
    path: "/store/filters",
    query: {
      filters: JSON.stringify(filters.value),
      single: true,
      filterMode: true,
    },
  }))
  const filterPathAdd = computed(() => ({
    path: "/store/filters/add",
    query: { filters: JSON.stringify(filters.value) },
  }))

  return {
    filters,
    isSingle,
    filterPath,
    filterPathSingle,
    filterPathMulti,
    filterPathAdd,
    selectedFiltersLength,
    joinedFilters,
    applyFilters,
    resetFilters,
    filterItems,
    isFilterMode,
  }
}
