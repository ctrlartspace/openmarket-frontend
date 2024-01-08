import { createRouter, createWebHistory } from "vue-router"
import CartPage from "@/pages/CartPage.vue"
import BaseDataPage from "@/pages/BaseDataPage.vue"
import ItemPage from "@/pages/ItemPage.vue"
import SalesPage from "@/pages/SalesPage.vue"

const routes = [
  { path: "/", component: CartPage },
  { path: "/cart", component: CartPage },
  { path: "/sales", component: SalesPage },
  { path: "/base", component: BaseDataPage },
  { path: "/items", component: ItemPage },
  { path: "/items/:id", component: ItemPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  //
  next()
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

export default router
