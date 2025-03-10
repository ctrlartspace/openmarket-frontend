import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/stores/user.store"
import { useRouteStore } from "@/stores/route.store"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import DesktopLayout from "@/components/layouts/DesktopLayout.vue"
import MobileLayout from "@/components/layouts/MobileLayout.vue"

// Определяем макет на основе размера экрана
const breakpoints = useBreakpoints(breakpointsTailwind)
const getLayout = () =>
  breakpoints.greater("sm").value ? DesktopLayout : MobileLayout

const routes = [
  {
    path: "/no-internet",
    component: () => import("@/pages/NoInternetPage.vue"),
  },
  { path: "/", redirect: "/point/items" },
  {
    path: "/cart",
    component: () => Promise.resolve(getLayout()), // Используем Promise для совместимости
    meta: { title: "Корзина", requiresAuth: true },
    redirect: "/cart/active",
    children: [
      {
        path: "active",
        component: () => import("@/pages/cart/items/CartActiveView.vue"),
        meta: { title: "Корзина", requiresAuth: true },
      },
      {
        path: "favorite",
        component: () => import("@/pages/cart/favorites/FavoriteItemsView.vue"),
        meta: { title: "Быстрые товары", requiresAuth: true },
      },
      {
        path: "free",
        component: () => import("@/pages/cart/free/FreeSaleView.vue"),
        meta: { title: "Свободная продажа", requiresAuth: true },
      },
    ],
  },
  {
    path: "/point",
    component: () => Promise.resolve(getLayout()), // Используем Promise для совместимости
    meta: { title: "Точка", requiresAuth: true },
    redirect: "/point/items",
    children: [
      {
        path: "info",
        component: () => import("@/pages/point/info/PointInfoView.vue"),
        meta: { title: "Точка", requiresAuth: true },
      },
      {
        path: "users",
        component: () => import("@/pages/point/users/PointUsersView.vue"),
        meta: { title: "Сотрудники", requiresAuth: true },
      },
      {
        path: "users/add",
        component: () => import("@/pages/point/users/PointUsersAdd.vue"),
        meta: { title: "Добавить сотрудника", requiresAuth: true },
      },
      {
        path: "items",
        component: () => import("@/pages/point/items/PointItemsView.vue"),
        meta: { title: "Товары", requiresAuth: true },
      },
      {
        path: "items/import",
        component: () => import("@/pages/point/items/PointItemsImport.vue"),
        meta: { title: "Импорт товаров", requiresAuth: true },
      },
      {
        path: "items/add",
        component: () => import("@/pages/point/items/PointItemsAdd.vue"),
        meta: { title: "Создать товар", requiresAuth: true },
      },
      {
        path: "items/:id",
        component: () => import("@/pages/point/items/PointItemDetails.vue"),
        meta: { title: "Детали товара", requiresAuth: true },
      },
      {
        path: "arrivals",
        component: () => import("@/pages/point/arrivals/ArrivalItemsView.vue"),
        meta: { title: "Поступления", requiresAuth: true },
      },
      {
        path: "arrivals/add",
        component: () => import("@/pages/point/arrivals/ArrivalItemsAdd.vue"),
        meta: { title: "Добавить поступление", requiresAuth: true },
      },
      {
        path: "sales",
        component: () => import("@/pages/point/sales/SaleItemsView.vue"),
        meta: { title: "Продажи", requiresAuth: true },
      },
    ],
  },
  {
    path: "/work-shifts",
    component: () => Promise.resolve(getLayout()), // Используем Promise для совместимости
    meta: { title: "Смены", requiresAuth: true },
    redirect: "/work-shifts/last",
    children: [
      {
        path: "last",
        component: () => import("@/pages/shift/items/ShiftLastView.vue"),
        meta: { title: "Сегодня", requiresAuth: true },
      },
      {
        path: "last/add",
        component: () => import("@/pages/shift/items/ShiftAdd.vue"),
        meta: { title: "Открытие смены", requiresAuth: true },
      },
      {
        path: "add",
        component: () => import("@/pages/shift/items/ShiftAdd.vue"),
        meta: { title: "Открытие смены", requiresAuth: true },
      },
      {
        path: "archive",
        component: () => import("@/pages/shift/archive/ShiftArchiveView.vue"),
        meta: { title: "История", requiresAuth: true },
      },
    ],
  },
  {
    path: "/ai",
    component: () => Promise.resolve(getLayout()), // Используем Promise для совместимости
    meta: { title: "AI", requiresAuth: true },
    redirect: "/ai/help",
    children: [
      {
        path: "help",
        component: () => import("@/pages/ai/AIHelpPage.vue"),
        meta: { title: "Помощь AI", requiresAuth: true },
      },
    ],
  },
  {
    path: "/store-create",
    component: () => import("@/pages/store-create/StoreCreatePage.vue"),
    redirect: "/store-create/user-info",
    meta: { requiresAuth: false },
    children: [
      {
        path: "user-info",
        component: () =>
          import("@/pages/store-create/user-info/StoreCreateUserInfoPage.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/pages/AuthPage.vue"),
    meta: { requiresAuth: false },
  },
  { path: "/scan2", component: () => import("@/pages/ScanPage2.vue") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const routeStore = useRouteStore()

  routeStore.setPreviousRoute(from)

  if (!to.meta.requiresAuth && !userStore.isAuthorizedStore) {
    await userStore.logOut()
    return next("/auth")
  }

  next()
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

export default router
