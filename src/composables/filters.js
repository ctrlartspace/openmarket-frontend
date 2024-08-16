import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

export function useFilters() {
  const route = useRoute()

  const filters = ref(undefined)
  const isSingle = ref(true)

  onMounted(() => {
    const routeFilters = route.query.filters
    if (routeFilters) {
      filters.value = JSON.parse(routeFilters)
    }

    const single = route.query.single
    if (single) {
      isSingle.value = JSON.parse(single)
    }
  })

  const selectedFiltersLength = computed(() => filters.value instanceof Array ? filters.value.length : 1)
  const joinedFilters = computed(() => filters.value instanceof Array ? filters.value.join(",") : filters.value)

  const filterPath = computed(() => ({
    path: "/point/filters",
    query: { filters: JSON.stringify(filters.value), filterMode: true }
  }))
  const filterPathMulti = computed(() => ({
    path: "/point/filters",
    query: { filters: JSON.stringify(filters.value), single: false, filterMode: true }
  }))
  const filterPathSingle = computed(() => ({
    path: "/point/filters",
    query: { filters: JSON.stringify(filters.value), single: true, filterMode: true }
  }))
  const filterPathAdd = computed(() => ({
    path: "/point/filters/add",
    query: { filters: JSON.stringify(filters.value) }
  }))

  return {
    filters,
    isSingle,
    filterPath,
    filterPathSingle,
    filterPathMulti,
    filterPathAdd,
    selectedFiltersLength,
    joinedFilters
  }
}
