<template>
  <footer class="@bottom-navigation pb-safe">
    <nav>
      <div
        class="flex h-[55px] items-center border-t border-gray-100 bg-white px-4 py-1 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <ul class="flex w-full items-center justify-around">
          <li v-for="(item, i) in menuItems" :key="i" class="relative">
            <router-link
              v-slot="{ isActive }"
              v-press
              :to="item.path"
              class="flex w-10 flex-col items-center justify-center active:brightness-90"
            >
              <span
                :class="
                  isActive
                    ? 'text-black dark:text-neutral-200'
                    : 'text-gray-300 dark:text-neutral-600'
                "
                class="material-symbols-rounded"
                >{{ item.icon }}</span
              >
              <span
                :class="
                  isActive
                    ? 'text-black dark:text-neutral-200'
                    : 'text-gray-300 dark:text-neutral-600'
                "
                class="w-20 truncate text-center text-sm"
                >{{ item.title }}</span
              >
              <div
                v-if="item.id === 1 && !cartStore.isEmpty"
                class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-start justify-end pr-1"
              >
                <span
                  :class="
                    isActive
                      ? 'bg-black text-white dark:bg-neutral-200 dark:text-black'
                      : 'bg-gray-300 text-white dark:bg-neutral-600 dark:text-black'
                  "
                  class="flex aspect-square h-3 items-center justify-center rounded-full text-[0.5rem] font-medium"
                  >{{ cartStore.itemsCount }}</span
                >
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!--    <nav v-else>-->
    <!--      <div-->
    <!--        class="flex h-[55px] items-center border-t border-gray-100 bg-white px-4 py-1 dark:border-neutral-800 dark:bg-neutral-900"-->
    <!--      >-->
    <!--        <ul class="flex w-full items-center justify-around">-->
    <!--          <li-->
    <!--            class="flex w-10 flex-col items-center justify-center active:brightness-90"-->
    <!--          ></li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </nav>-->
  </footer>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useCartStore } from "@/stores/cart.store"

const store = useUserStore()
const cartStore = useCartStore()

const menuItems = ref(
  [
    {
      id: 1,
      title: "Корзина",
      path: "/cart",
      visible: store.isAuthorizedPoint,
      icon: "shopping_cart",
    },
    {
      id: 2,
      title: "Смена",
      path: "/work-shifts",
      visible: store.isAuthorizedPoint,
      icon: "group",
    },
    // {
    //   id: 3,
    //   title: "Сканер",
    //   path: "/scan2",
    //   visible: true,
    //   icon: "center_focus_strong",
    // },

    {
      id: 4,
      title: "Чат-бот",
      path: "/ai",
      visible: true,
      icon: "chat",
    },
    {
      id: 5,
      title: "Магазин",
      path: "/point",
      visible: store.isAuthorizedPoint,
      icon: "store",
    },

    {
      id: 5,
      title: "Магазин",
      path: "/store",
      visible: store.isAuthorizedStore && !store.isAuthorizedPoint,
      icon: "store",
    },
  ].filter((item) => item.visible),
)
</script>

<style scoped></style>
