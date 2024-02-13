<template>
  <nav v-if="store.isAuthorized">
    <!--  Mobile -->
    <div class="sticky px-4 py-2 bg-white border-b border-gray-200 shadow-sm">
      <h2 class="font-semibold text-lg text-center w-full">
        {{ getCurrentItem }}
      </h2>
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
  },
  {
    title: "Касса",
    path: "/cash",
    visible: true,
  },
  {
    title: "Продажи",
    path: "/sales",
    visible: true,
  },
  {
    title: "Поступления",
    path: "/incomes",
    visible: true,
  },
  {
    title: "База",
    path: "/base",
    visible: true,
  },
  {
    title: "Сканирование",
    path: "/scan",
    visible: false,
  },
])
</script>

<style scoped></style>
