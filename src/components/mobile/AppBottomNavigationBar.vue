<template>
  <footer class="@bottom-navigation pb-safe">
    <nav v-if="store.isAuthorizedPoint">
      <div class="border-t border-neutral-200 bg-white px-4 py-1">
        <ul class="flex justify-around gap-2">
          <li class="relative" v-for="(item, i) in menuItems" :key="i">
            <router-link
              v-slot="{ isActive }"
              :to="item.path"
              class="flex w-12 flex-col items-center justify-center active:brightness-90"
              v-press
            >
              <span
                :class="isActive ? 'text-black' : 'text-neutral-300'"
                class="material-symbols-rounded"
                >{{ item.icon }}</span
              >
              <span
                :class="isActive ? 'text-black' : 'text-neutral-300'"
                class="text-[12px]"
                >{{ item.title }}</span
              >
              <div
                v-if="item.id === 1 && !cartStore.isEmpty"
                class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-start justify-end pr-2"
              >
                <span
                  class="flex aspect-square h-3 items-center justify-center rounded-full text-[0.5rem] font-medium text-white"
                  :class="isActive ? 'bg-black' : 'bg-neutral-300'"
                  >{{ cartStore.itemsCount }}</span
                >
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useCartStore } from "@/stores/cart.store"

const store = useUserStore()
const cartStore = useCartStore()

const menuItems = ref([
  {
    id: 1,
    title: "Корзина",
    path: "/cart",
    visible: true,
    icon: "shopping_cart",
  },
  {
    id: 2,
    title: "Смена",
    path: "/cash-register",
    visible: true,
    icon: "group",
  },
  {
    id: 3,
    title: "Сканер",
    path: "/scan2",
    visible: true,
    icon: "center_focus_strong",
  },
  {
    id: 4,
    title: "Точка",
    path: "/point",
    visible: true,
    icon: "adjust",
  },
  {
    id: 5,
    title: "Магазин",
    path: "/store",
    visible: true,
    icon: "store",
  },
])
</script>

<style scoped></style>
