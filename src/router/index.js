import { createRouter, createWebHistory } from "vue-router"
import CartPage from "@/pages/CartPage.vue"

const routes = [
  { path: "/", component: CartPage },
  { path: "/cart", component: CartPage },
  { path: "/sales", component: CartPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "app-router-link-active",
})

router.beforeEach((to, from, next) => {
  //
  next()
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

export default router
