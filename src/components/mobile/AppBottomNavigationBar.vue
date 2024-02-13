<template>
  <nav v-if="store.isAuthorized">
    <div
      class="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-gray-200 bg-white"
    >
      <ul class="flex gap-2 justify-around">
        <li v-for="(item, i) in menuItems" :key="i">
          <router-link
            class="flex items-center"
            v-slot="{ isActive }"
            :to="item.path"
          >
            <span
              class="material-icons-outlined"
              :class="isActive ? 'text-black' : 'text-gray-300'"
              >{{ item.icon }}</span
            >
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue"
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
    path: "/cash",
    visible: true,
    icon: "receipt",
  },
  {
    title: "Продажи",
    path: "/sales",
    visible: true,
    icon: "arrow_upward",
  },
  {
    title: "Поступления",
    path: "/incomes",
    visible: true,
    icon: "arrow_downward",
  },
  {
    title: "База",
    path: "/base",
    visible: true,
    icon: "menu",
  },
])
</script>

<style scoped></style>
