<template>
  <nav v-if="store.isAuthorized">
    <ul class="hidden md:flex gap-4">
      <li class="inline" v-for="(item, i) in menuItems" :key="i">
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            class="font-semibold text-lg"
            :class="isActive ? 'text-black' : 'text-gray-300'"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
      <li class="inline ml-auto">
        <router-link v-slot="{ isActive }" to="/profile">
          <span
            class="font-semibold text-lg"
            :class="isActive ? 'text-black' : 'text-gray-300'"
          >
            Меню
          </span>
        </router-link>
      </li>
    </ul>
    <div
      class="md:hidden sticky px-4 py-2 bg-white border-b border-gray-200 shadow-sm"
    >
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg">
          {{ menuItems.find((item) => item.path === route.path)?.title }}
        </h2>
        <label for="navbar-toggle" class="flex items-center">
          <span class="material-icons-outlined">{{
            isCollapsed ? "close" : "menu"
          }}</span>
        </label>
      </div>
      <input
        v-model="isCollapsed"
        class="hidden"
        id="navbar-toggle"
        type="checkbox"
      />
      <div v-if="isCollapsed">
        <ul>
          <li
            class=""
            v-for="(item, i) in menuItems.filter(
              (item) => item.path !== route.path
            )"
            :key="i"
          >
            <router-link
              v-slot="{ isActive }"
              :to="item.path"
              @click="isCollapsed = false"
            >
              <span
                class="font-semibold text-lg"
                :class="isActive ? 'text-black' : 'text-gray-300'"
              >
                {{ item.title }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user.store"

const route = useRoute()
const store = useUserStore()
const isCollapsed = ref(false)

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Касса",
    path: "/cash",
  },
  {
    title: "Продажи",
    path: "/sales",
  },
  {
    title: "Поступления",
    path: "/incomes",
  },
  {
    title: "База",
    path: "/base",
  },
])
</script>

<style scoped></style>
