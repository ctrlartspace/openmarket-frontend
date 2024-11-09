import { createRouter, createWebHistory } from "vue-router"
import AuthPage from "@/pages/AuthPage.vue"
import ScanPage2 from "@/pages/ScanPage2.vue"
import StorePage from "@/pages/store/StorePage.vue"
import StoreInfoView from "@/pages/store/info/StoreInfoView.vue"
import StoreUsersAdd from "@/pages/store/users/StoreUsersAdd.vue"
import StoreUsersView from "@/pages/store/users/StoreUsersView.vue"
import StoreItemsAdd from "@/pages/store/items/StoreItemsAdd.vue"
import StoreItemsView from "@/pages/store/items/StoreItemsView.vue"
import StoreItemDetails from "@/pages/store/items/StoreItemDetails.vue"
import StorePointsAdd from "@/pages/store/points/StorePointsAdd.vue"

import PointPage from "@/pages/point/PointPage.vue"
import PointUsersAdd from "@/pages/point/users/PointUsersAdd.vue"
import PointUsersView from "@/pages/point/users/PointUsersView.vue"
import PointItemsView from "@/pages/point/items/PointItemsView.vue"
import PointItemsAdd from "@/pages/point/items/PointItemsAdd.vue"
import PointItemDetails from "@/pages/point/items/PointItemDetails.vue"
import StoreFiltersView from "@/pages/store/filters/StoreFiltersView.vue"
import StoreFiltersAdd from "@/pages/store/filters/StoreFiltersAdd.vue"
import ArrivalItemsView from "@/pages/point/arrivals/ArrivalItemsView.vue"
import ArrivalItemsAdd from "@/pages/point/arrivals/ArrivalItemsAdd.vue"
import { useUserStore } from "@/stores/user.store"
import { useRouteStore } from "@/stores/route.store"

import CashRegisterPage from "@/pages/cash-register/CashRegisterPage.vue"
import CashRegisterActiveView from "@/pages/cash-register/items/CashRegisterActiveView.vue"
import CashRegisterAdd from "@/pages/cash-register/items/CashRegisterAdd.vue"
import CashRegisterArchiveView from "@/pages/cash-register/archive/CashRegisterArchiveView.vue"
import PageContent from "@/pages/PageContent.vue"
import SaleItemsView from "@/pages/point/sales/SaleItemsView.vue"
import CartPage from "@/pages/cart/CartPage.vue"
import CartActiveView from "@/pages/cart/items/CartActiveView.vue"
import FiltersAddPage from "@/pages/FiltersAddPage.vue"
import PointInfoView from "@/pages/point/info/PointInfoView.vue"
import StoreCreatePage from "@/pages/store-create/StoreCreatePage.vue"
import StoreCreateUserInfoPage from "@/pages/store-create/user-info/StoreCreateUserInfoPage.vue"

const routes = [
  { path: "/", redirect: "/store" },
  {
    path: "/cart",
    component: CartPage,
    redirect: "/cart/active",
    children: [
      {
        path: "active",
        component: PageContent,
        children: [
          {
            path: "",
            component: CartActiveView,
          },
        ],
      },
    ],
  },
  {
    path: "/store",
    component: StorePage,
    redirect: "/store/info",
    children: [
      {
        path: "info",
        component: PageContent,
        children: [
          {
            path: "",
            component: StoreInfoView,
          },
        ],
      },
      {
        path: "users",
        component: PageContent,
        children: [
          {
            path: "",
            component: StoreUsersView,
          },
          {
            path: "add",
            component: StoreUsersAdd,
          },
        ],
      },
      {
        path: "points",
        component: PageContent,
        children: [
          {
            path: "add",
            component: StorePointsAdd,
          },
        ],
      },
      {
        path: "items",
        component: PageContent,
        children: [
          {
            path: "",
            component: StoreItemsView,
          },
          {
            path: "add",
            component: StoreItemsAdd,
          },
          {
            path: ":id",
            component: StoreItemDetails,
          },
        ],
      },
      {
        path: "filters",
        component: PageContent,
        children: [
          {
            path: "",
            component: StoreFiltersView,
          },
          {
            path: "add",
            component: StoreFiltersAdd,
          },
        ],
      },
    ],
  },
  {
    path: "/point",
    component: PointPage,
    redirect: "/point/items",
    children: [
      {
        path: "info",
        component: PageContent,
        children: [
          {
            path: "",
            component: PointInfoView,
          },
        ],
      },
      {
        path: "users",
        component: PageContent,
        children: [
          {
            path: "",
            component: PointUsersView,
          },
          {
            path: "add",
            component: PointUsersAdd,
          },
        ],
      },
      {
        path: "items",
        component: PageContent,
        children: [
          {
            path: "",
            component: PointItemsView,
          },
          {
            path: "add",
            component: PointItemsAdd,
          },
          {
            path: ":id",
            component: PointItemDetails,
          },
        ],
      },
      {
        path: "arrivals",
        component: PageContent,
        children: [
          {
            path: "",
            component: ArrivalItemsView,
          },
          {
            path: "add",
            component: ArrivalItemsAdd,
          },
        ],
      },
      {
        path: "sales",
        component: PageContent,
        children: [
          {
            path: "",
            component: SaleItemsView,
          },
        ],
      },
    ],
  },
  {
    path: "/cash-register",
    component: CashRegisterPage,
    redirect: "/cash-register/active",
    children: [
      {
        path: "active",
        component: PageContent,
        children: [
          {
            path: "",
            component: CashRegisterActiveView,
          },
          {
            path: "add",
            component: CashRegisterAdd,
          },
        ],
      },
      {
        path: "archive",
        component: PageContent,
        children: [
          {
            path: "",
            component: CashRegisterArchiveView,
          },
        ],
      },
    ],
  },
  {
    path: "/store-create",
    component: StoreCreatePage,
    redirect: "/store-create/user-info",
    children: [
      {
        path: "user-info",
        component: PageContent,
        children: [
          {
            path: "",
            component: StoreCreateUserInfoPage,
          },
        ],
      },
    ],
  },
  { path: "/auth", component: AuthPage },
  { path: "/store/create", component: StoreCreatePage },
  { path: "/scan2", component: ScanPage2 },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const routeStore = useRouteStore()

  routeStore.setPreviousRoute(from)
  console.log(to.path)
  if (
    to.path !== "/auth" &&
    to.path !== "/store-create" &&
    to.path !== "/store-create/user-info" &&
    !userStore.isAuthorizedStore
  ) {
    userStore.logOut()
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

export default router
