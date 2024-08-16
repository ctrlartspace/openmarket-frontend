<template>
  <div class="grid grid-cols-10 h-full">
    <div class="col-span-4 border-r border-neutral-300">
      <div class="h-full flex flex-col justify-between">
        <ul class="">
          <li
            v-for="item in menuItems"
            :key="item"
            class="px-4 py-1 bg-white border-b border-neutral-300"
          >
            <router-link v-slot="{ isActive }" :to="item.path">
              <span
                class="font-medium text-base"
                :class="isActive ? 'text-black' : 'text-gray-300'"
              >
                {{ item.title }}
              </span>
            </router-link>
          </li>
        </ul>
        <ul>
          <li class="px-4 py-1 border-t border-neutral-300">
            <button
              class="font-medium text-base text-gray-300 hover:text-black"
              @click="store.logOut()"
            >
              Завершить работу
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user.store"

const menuItems = ref([
  {
    title: "Точки продаж",
    path: "/store/points",
  },
  {
    title: "Сотрудники",
    path: "/store/users",
  },
  {
    title: "Товары",
    path: "/store/items",
  },
])

const store = useUserStore()
</script>

<style></style>
