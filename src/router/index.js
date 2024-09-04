import { createRouter, createWebHistory } from "vue-router"
import CartPage from "@/pages/CartPage.vue"
import BaseDataPage from "@/pages/BaseDataPage.vue"
import ItemPage from "@/pages/ItemPage.vue"
// import SalesPage from "@/pages/SalesPage.vue"
import IncomesPage from "@/pages/IncomesPage.vue"
import AddIncomesPage from "@/pages/AddIncomesPage.vue"
import AuthPage from "@/pages/AuthPage.vue"
import CashPage from "@/pages/CashPage.vue"
import ScanPage from "@/pages/ScanPage.vue"
import ProfilePage from "@/pages/ProfilePage.vue"
import StorePage from "@/pages/store/StorePage.vue"
import StoreUsers from "@/pages/store/users/StoreUsers.vue"
import StoreUsersAdd from "@/pages/store/users/StoreUsersAdd.vue"
import StoreUsersView from "@/pages/store/users/StoreUsersView.vue"
import StoreItems from "@/pages/store/items/StoreItems.vue"
import StoreItemsAdd from "@/pages/store/items/StoreItemsAdd.vue"
import StoreItemsView from "@/pages/store/items/StoreItemsView.vue"
import StoreItemDetails from "@/pages/store/items/StoreItemDetails.vue"
import StorePoints from "@/pages/store/points/StorePoints.vue"
import StorePointsView from "@/pages/store/points/StorePointsView.vue"
import StorePointsAdd from "@/pages/store/points/StorePointsAdd.vue"

import PointPage from "@/pages/point/PointPage.vue"
import PointUsers from "@/pages/point/users/PointUsers.vue"
import PointUsersAdd from "@/pages/point/users/PointUsersAdd.vue"
import PointUsersView from "@/pages/point/users/PointUsersView.vue"

import PointItems from "@/pages/point/items/PointItems.vue"
import PointItemsView from "@/pages/point/items/PointItemsView.vue"
import PointItemsAdd from "@/pages/point/items/PointItemsAdd.vue"
import PointItemDetails from "@/pages/point/items/PointItemDetails.vue"

import PointFilters from "@/pages/point/filters/PointFilters.vue"
import PointFiltersView from "@/pages/point/filters/PointFiltersView.vue"
import PointFiltersAdd from "@/pages/point/filters/PointFiltersAdd.vue"

import ArrivalsPage from "@/pages/arrivals/ArrivalsPage.vue"
import ArrivalItems from "@/pages/arrivals/items/ArrivalItems.vue"
import ArrivalItemsView from "@/pages/arrivals/items/ArrivalItemsView.vue"
import ArrivalItemsAdd from "@/pages/arrivals/items/ArrivalItemsAdd.vue"

import SalesPage from "@/pages/sales/SalesPage.vue"
import SaleItems from "@/pages/sales/items/SaleItems.vue"
// import SelectFiltersPage from "@/pages/selectable/SelectFiltersPage.vue"
import { useUserStore } from "@/stores/user.store"
import { useRouteStore } from "@/stores/route.store"
import SaleItemsView from "@/pages/sales/items/SaleItemsView.vue"

const routes = [
  { path: "/", component: CartPage },
  {
    path: "/store",
    name: "store",
    component: StorePage,
    redirect: "/store/points",
    children: [
      {
        path: "users",
        component: StoreUsers,
        children: [
          {
            path: "",
            name: "storeUsers",
            component: StoreUsersView,
          },
          {
            path: "add",
            name: "storeUsersAdd",
            component: StoreUsersAdd,
          },
        ],
      },
      {
        path: "points",
        component: StorePoints,
        children: [
          {
            path: "",
            name: "storePoints",
            component: StorePointsView,
          },
          {
            path: "add",
            name: "storePointsAdd",
            component: StorePointsAdd,
          },
        ],
      },
      {
        path: "items",
        component: StoreItems,
        children: [
          {
            path: "",
            name: "storeItems",
            component: StoreItemsView,
          },
          {
            path: "add",
            name: "storeItemsAdd",
            component: StoreItemsAdd,
          },
          {
            path: ":id",
            name: "storeItem",
            component: StoreItemDetails,
          },
        ],
      },
    ],
  },
  {
    path: "/point",
    component: PointPage,
    name: "point",
    redirect: "/point/items",
    children: [
      {
        path: "users",
        component: PointUsers,
        children: [
          {
            path: "",
            name: "pointUsers",
            component: PointUsersView,
          },
          {
            path: "add",
            name: "pointUsersAdd",
            component: PointUsersAdd,
          },
        ],
      },
      {
        path: "items",
        component: PointItems,
        children: [
          {
            path: "",
            name: "pointItems",
            component: PointItemsView,
          },
          {
            path: "add",
            name: "pointItemsAdd",
            component: PointItemsAdd,
          },
          {
            path: ":id",
            name: "pointItem",
            component: PointItemDetails,
          },
        ],
      },
      {
        path: "filters",
        component: PointFilters,
        children: [
          {
            path: "",
            name: "pointFilters",
            component: PointFiltersView,
          },
          {
            path: "add",
            name: "pointFiltersAdd",
            component: PointFiltersAdd,
          },
        ],
      },
    ],
  },
  {
    path: "/arrivals",
    component: ArrivalsPage,
    name: "arrivals",
    redirect: "/arrivals/items",
    children: [
      {
        path: "items",
        component: ArrivalItems,
        children: [
          {
            path: "",
            name: "arrivalItems",
            component: ArrivalItemsView,
          },
          {
            path: "add",
            name: "arrivalItemsAdd",
            component: ArrivalItemsAdd,
          },
        ],
      },
    ],
  },
  {
    path: "/sales",
    component: SalesPage,
    name: "sales",
    redirect: "/sales/items",
    children: [
      {
        path: "items",
        component: SaleItems,
        children: [
          {
            path: "",
            name: "saleItems",
            component: SaleItemsView,
          },
          // {
          //   path: "add",
          //   name: "arrivalItemsAdd",
          //   component: ArrivalItemsAdd
          // }
        ],
      },
    ],
  },
  { path: "/cart", name: "cart", component: CartPage },
  // { path: "/sales", name: "sales", component: SalesPage },
  { path: "/incomes", name: "incomes", component: IncomesPage },
  { path: "/incomes/add", name: "incomesAdd", component: AddIncomesPage },
  { path: "/base", name: "base", component: BaseDataPage },
  { path: "/items", name: "items", component: ItemPage },
  { path: "/items/:id", name: "item", component: ItemPage },
  { path: "/profile", name: "profile", component: ProfilePage },
  { path: "/auth", name: "auth", component: AuthPage },
  { path: "/cash", name: "cash", component: CashPage },
  { path: "/scan", name: "scan", component: ScanPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const routeStore = useRouteStore()

  routeStore.setPreviousRoute(from)
  if (to.path !== "/auth" && !userStore.isAuthorizedStore) {
    userStore.logOut()
  } else {
    console.log("next")
    next()
  }
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

export default router
