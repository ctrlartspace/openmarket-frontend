import { createRouter, createWebHistory } from "vue-router"
// import CartPage from "@/pages/CartPage.vue"
import BaseDataPage from "@/pages/BaseDataPage.vue"
import ItemPage from "@/pages/ItemPage.vue"
import IncomesPage from "@/pages/IncomesPage.vue"
import AddIncomesPage from "@/pages/AddIncomesPage.vue"
import AuthPage from "@/pages/AuthPage.vue"
import ScanPage from "@/pages/ScanPage.vue"
import ProfilePage from "@/pages/ProfilePage.vue"
import StorePage from "@/pages/store/StorePage.vue"
import StoreUsersAdd from "@/pages/store/users/StoreUsersAdd.vue"
import StoreUsersView from "@/pages/store/users/StoreUsersView.vue"
import StoreItemsAdd from "@/pages/store/items/StoreItemsAdd.vue"
import StoreItemsView from "@/pages/store/items/StoreItemsView.vue"
import StoreItemDetails from "@/pages/store/items/StoreItemDetails.vue"
import StorePointsView from "@/pages/store/points/StorePointsView.vue"
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
// import SelectFiltersPage from "@/pages/selectable/SelectFiltersPage.vue"
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
    redirect: "/store/points",
    children: [
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
            path: "",
            component: StorePointsView,
          },
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
  { path: "/cart", component: CartPage },
  // { path: "/sales",  component: SalesPage },
  { path: "/incomes", component: IncomesPage },
  { path: "/incomes/add", component: AddIncomesPage },
  { path: "/base", component: BaseDataPage },
  { path: "/items", component: ItemPage },
  { path: "/items/:id", component: ItemPage },
  { path: "/profile", component: ProfilePage },
  { path: "/auth", component: AuthPage },
  // { path: "/cash-register", component: CashPage },
  { path: "/scan", component: ScanPage },
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
