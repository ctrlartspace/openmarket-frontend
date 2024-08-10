import { createRouter, createWebHistory } from "vue-router"
import CartPage from "@/pages/CartPage.vue"
import BaseDataPage from "@/pages/BaseDataPage.vue"
import ItemPage from "@/pages/ItemPage.vue"
import SalesPage from "@/pages/SalesPage.vue"
import IncomesPage from "@/pages/IncomesPage.vue"
import AddIncomesPage from "@/pages/AddIncomesPage.vue"
import AuthPage from "@/pages/AuthPage.vue"
import CashPage from "@/pages/CashPage.vue"
import ScanPage from "@/pages/ScanPage.vue"
import ProfilePage from "@/pages/ProfilePage.vue"
import StorePage from "@/pages/StorePage.vue"
import StorePointPage from "@/pages/StorePointPage.vue"
import { useUserStore } from "@/stores/user.store"

const routes = [
  { path: "/", component: CartPage },
  { path: "/store", component: StorePage },
  { path: "/store/point", component: StorePointPage },
  { path: "/cart", component: CartPage },
  { path: "/sales", component: SalesPage },
  { path: "/incomes", component: IncomesPage },
  { path: "/incomes/add", component: AddIncomesPage },
  { path: "/base", component: BaseDataPage },
  { path: "/items", component: ItemPage },
  { path: "/items/:id", component: ItemPage },
  { path: "/profile", component: ProfilePage },
  { path: "/auth", component: AuthPage },
  { path: "/cash", component: CashPage },
  { path: "/scan", component: ScanPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.path != "/auth" && !store.isAuthorizedStore) {
    store.logOut()
  } else {
    console.log("next")
    next()
  }
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

export default router
