<template>
  <nav
    class="border-b border-neutral-100 bg-white"
    v-if="store.isAuthorizedPoint"
  >
    <!-- Desktop -->
    <ul class="mx-auto flex w-full max-w-[900px] gap-4 px-4 py-1">
      <li v-for="(item, i) in menuItems" :key="i" class="inline">
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
      <li class="ml-auto"></li>
      <li v-if="store.point" class="inline w-auto truncate text-blue-300">
        <router-link v-slot="{ isActive }" to="/point">
          <span
            :class="isActive ? 'text-blue-600' : 'text-blue-300'"
            class="font-medium"
          >
            {{ store.point.name }}
          </span>
        </router-link>
      </li>
      <li class="inline">
        <router-link v-slot="{ isActive }" to="/store">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium"
          >
            Магазин
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
  <nav class="border-b border-neutral-100 bg-white" v-else>
    <ul class="mx-auto flex w-full max-w-[900px] gap-4 px-4 py-1">
      <li class="ml-auto"></li>
      <li class="inline">
        <router-link v-slot="{ isActive }" to="/store">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium"
          >
            {{ getStoreTitle }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()

const getStoreTitle = computed(() =>
  store.isAuthorizedStore ? "Магазин" : "Open Kassa",
)

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Смена",
    path: "/shift",
  },
  {
    title: "Продажи",
    path: "/point/sales",
  },
])
</script>

<style scoped></style>
