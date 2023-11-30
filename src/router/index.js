import { createRouter, createWebHistory } from "vue-router"
import CartPage from "@/pages/CartPage.vue"
import BaseDataPage from "@/pages/BaseDataPage.vue"
import ItemPage from "@/pages/ItemPage.vue"

const routes = [
  { path: "/", component: CartPage },
  { path: "/cart", component: CartPage },
  { path: "/sales", component: CartPage },
  { path: "/base", component: BaseDataPage },
  { path: "/item", component: ItemPage },
  { path: "/item/:id", component: ItemPage },
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
