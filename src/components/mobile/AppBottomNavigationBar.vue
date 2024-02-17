<template>
  <footer class="pb-safe">
    <nav v-if="store.isAuthorized">
      <div class="px-4 py-1 border-t border-gray-200 bg-white">
        <ul class="flex gap-2 justify-around">
          <li v-for="(item, i) in menuItems" :key="i">
            <router-link v-slot="{ isActive }" :to="item.path">
              <button class="flex flex-col items-center justify-center w-12">
                <span
                  class="material-icons-outlined"
                  :class="isActive ? 'text-black' : 'text-gray-300'"
                  >{{ item.icon }}</span
                >
                <span
                  class="text-xs text-[12px]"
                  :class="isActive ? 'text-black' : 'text-gray-300'"
                  >{{ item.title }}</span
                >
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
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
    title: "Сканер",
    path: "/scan",
    visible: true,
    icon: "qr_code_scanner",
  },
  {
    title: "Продажи",
    path: "/sales",
    visible: true,
    icon: "arrow_upward",
  },
  {
    title: "База",
    path: "/base",
    visible: true,
    icon: "list_alt",
  },
])
</script>

<style scoped></style>
