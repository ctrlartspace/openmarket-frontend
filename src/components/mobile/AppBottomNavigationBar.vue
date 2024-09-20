<template>
  <footer class="@bottom-navigation pb-safe">
    <nav v-if="store.isAuthorizedPoint">
      <div class="px-4 py-1 border-t border-gray-200 bg-white">
        <ul class="flex gap-2 justify-around">
          <li v-for="(item, i) in menuItems" :key="i">
            <router-link
              v-slot="{ isActive }"
              :to="item.path"
              class="flex flex-col items-center justify-center w-12 active:brightness-90"
            >
              <span
                :class="isActive ? 'text-black' : 'text-gray-300'"
                class="material-icons-outlined"
                >{{ item.icon }}</span
              >
              <span
                :class="isActive ? 'text-black' : 'text-gray-300'"
                class="text-[10px]"
                >{{ item.title }}</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script setup>
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user.store"

const route = useRoute()
const store = useUserStore()
const isCollapsed = ref(false)

const getCurrentItem = computed(() => {
  const currentItem = menuItems.value.find((item) => item.path === route.path)
  if (currentItem) {
    return currentItem.title
  }
  return "Меню"
})

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
    visible: true,
    icon: "shopping_cart",
  },
  {
    title: "Касса",
    path: "/cash-register",
    visible: true,
    icon: "receipt",
  },
  {
    title: "Сканер",
    path: "/scan",
    visible: true,
    icon: "center_focus_strong",
  },
  {
    title: "Точка",
    path: "/point",
    visible: true,
    icon: "adjust",
  },
  {
    title: "Магазин",
    path: "/store",
    visible: true,
    icon: "store",
  },
])
</script>

<style scoped></style>
