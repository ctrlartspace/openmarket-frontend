<template>
  <header class="sticky top-0 z-10">
    <nav v-if="store.isAuthorized">
      <div
        class="px-4 py-2 bg-white border-b border-gray-200 flex items-center"
      >
        <div class="absolute">
          <button class="flex items-center" @click="goBack">
            <span class="material-icons-outlined text-xl">arrow_back_ios</span>
          </button>
        </div>
        <h2 class="font-semibold text-lg text-center w-full">
          {{ getCurrentItem }}
        </h2>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/stores/user.store"

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const getCurrentItem = computed(() => {
  const currentItem = menuItems.value.find((item) => item.path === route.path)
  if (currentItem) {
    return currentItem.title
  }
  return "Меню"
})

const goBack = () => {
  router.go(-1)
}

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
