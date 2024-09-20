<template>
  <div class="@base-page md:hidden z-50 flex flex-col h-full">
    <header>
      <nav>
        <div
          class="px-4 py-2 bg-white border-b border-gray-200 flex items-center"
        >
          <div class="absolute">
            <button class="flex items-center" @click="toggleSideMenu">
              <span class="material-icons-outlined">menu</span>
            </button>
          </div>
          <h2 class="font-medium text-lg text-center w-full">
            {{ headerTitle }}
          </h2>
        </div>
      </nav>
    </header>

    <section class="flex flex-col flex-1 relative overflow-auto">
      <div
        :class="isSideMenuExpanded ? 'translate-x-0' : '-translate-x-full'"
        class="z-50 absolute top-0 left-0 right-0 bottom-0 transition-transform will-change-transform"
        @click="toggleSideMenu"
      >
        <ul class="w-2/3 bg-white h-full border-r border-neutral-300 shadow-xl">
          <li
            v-for="item in menuItems"
            :key="item"
            class="px-4 py-1 bg-white border-b border-neutral-300 whitespace-nowrap"
          >
            <router-link
              v-slot="{ isActive }"
              :to="item.path"
              @click.stop="onMenuItemClick(item)"
            >
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
      <div class="h-full flex flex-col">
        <router-view></router-view>
      </div>
    </section>
    <footer>
      <app-bottom-navigation-bar />
    </footer>
  </div>

  <div class="hidden md:grid grid-cols-10 w-full">
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
    <div class="col-span-6 overflow-hidden overflow-y-scroll flex flex-col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
})

const headerTitle = ref("Меню")
const isSideMenuExpanded = ref(false)

const toggleSideMenu = () => {
  isSideMenuExpanded.value = !isSideMenuExpanded.value
  console.log("togle")
}

const onMenuItemClick = (item) => {
  headerTitle.value = item.title
  toggleSideMenu()
}
</script>

<style></style>
