import { createRouter, createWebHistory } from "vue-router"

import AuthPage from "@/pages/AuthPage.vue"
import ScanPage2 from "@/pages/ScanPage2.vue"
import StorePage from "@/pages/store/StorePage.vue"
import StoreInfoView from "@/pages/store/info/StoreInfoView.vue"
import StoreUsersAdd from "@/pages/store/users/StoreUsersAdd.vue"
import StoreUsersView from "@/pages/store/users/StoreUsersView.vue"
import StorePointsAdd from "@/pages/store/points/StorePointsAdd.vue"

import PointPage from "@/pages/point/PointPage.vue"
import PointUsersAdd from "@/pages/point/users/PointUsersAdd.vue"
import PointUsersView from "@/pages/point/users/PointUsersView.vue"
import PointItemsView from "@/pages/point/items/PointItemsView.vue"
import PointItemsAdd from "@/pages/point/items/PointItemsAdd.vue"
import PointItemDetails from "@/pages/point/items/PointItemDetails.vue"
import ArrivalItemsView from "@/pages/point/arrivals/ArrivalItemsView.vue"
import ArrivalItemsAdd from "@/pages/point/arrivals/ArrivalItemsAdd.vue"

import ShiftPage from "@/pages/shift/ShiftPage.vue"
import ShiftLastView from "@/pages/shift/items/ShiftLastView.vue"
import ShiftAdd from "@/pages/shift/items/ShiftAdd.vue"
import ShiftArchiveView from "@/pages/shift/archive/ShiftArchiveView.vue"
import PageContent from "@/pages/PageContent.vue"
import SaleItemsView from "@/pages/point/sales/SaleItemsView.vue"
import CartPage from "@/pages/cart/CartPage.vue"
import CartActiveView from "@/pages/cart/items/CartActiveView.vue"
import FavoriteItemsView from "@/pages/cart/favorites/FavoriteItemsView.vue"
import FreeSaleView from "@/pages/cart/free/FreeSaleView.vue"
import PointInfoView from "@/pages/point/info/PointInfoView.vue"
import StoreCreatePage from "@/pages/store-create/StoreCreatePage.vue"
import StoreCreateUserInfoPage from "@/pages/store-create/user-info/StoreCreateUserInfoPage.vue"
import NoInternetPage from "@/pages/NoInternetPage.vue"
import PointItemsImport from "@/pages/point/items/PointItemsImport.vue"

import { useUserStore } from "@/stores/user.store"
import { useRouteStore } from "@/stores/route.store"

const routes = [
  { path: "/no-internet", component: NoInternetPage },
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
      {
        path: "favorite",
        component: PageContent,
        children: [
          {
            path: "",
            component: FavoriteItemsView,
          },
        ],
      },
      {
        path: "free",
        component: PageContent,
        children: [
          {
            path: "",
            component: FreeSaleView,
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

          {
            path: "new-point",
            component: StorePointsAdd,
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
    ],
  },
  {
    path: "/point",
    component: PointPage,
    redirect: "/point/info",
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
            path: "import",
            component: PointItemsImport,
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
    path: "/work-shifts",
    component: ShiftPage,
    redirect: "/work-shifts/last",
    children: [
      {
        path: "last",
        component: PageContent,
        children: [
          {
            path: "",
            component: ShiftLastView,
          },
          {
            path: "add",
            component: ShiftAdd,
          },
        ],
      },
      {
        path: "add",
        component: ShiftAdd,
      },
      {
        path: "archive",
        component: PageContent,
        children: [
          {
            path: "",
            component: ShiftArchiveView,
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
