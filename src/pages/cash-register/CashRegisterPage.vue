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
                :class="isActive ? 'text-black' : 'text-gray-300'"
                class="font-medium text-base"
              >
                {{ item.title }}
              </span>
            </router-link>
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

const menuItems = ref([
  {
    title: "Активная",
    path: "/cash-register/active",
  },
])
</script>

<style></style>
