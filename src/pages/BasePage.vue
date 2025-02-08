<template>
  <div v-if="!isDesktop" class="@base-page z-50 flex h-full flex-col">
    <div
      v-if="!onlineStore.isOnline"
      class="animate-pulse bg-rose-50 py-1 text-center text-rose-500"
    >
      Нет подключения к интернету
    </div>
    <header>
      <nav
        class="flex h-[55px] flex-col justify-center gap-2 border-b border-gray-100 px-8 py-3"
      >
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <h1 class="truncate whitespace-nowrap font-medium">
              {{ headerTitle }}
            </h1>
          </div>

          <span class="ml-auto"></span>
          <router-link
            v-if="userStore.isAuthorizedPoint"
            v-press
            class="pointer-events-auto flex select-none items-center justify-center gap-2 rounded-xl bg-white text-center font-medium"
            to="/point/info"
          >
            <span class="material-symbols-rounded font-medium"> store </span>
          </router-link>

          <button
            v-press
            class="pointer-events-auto flex select-none items-center justify-center gap-2 rounded-xl bg-white text-center font-medium"
            @click="toggleSideMenu"
          >
            <span v-if="isSideMenuExpanded" class="material-symbols-rounded"
              >close</span
            >
            <span v-else class="material-symbols-rounded font-medium">
              menu
            </span>
          </button>
        </div>
      </nav>
    </header>

    <section class="relative flex flex-1 flex-col overflow-auto">
      <div
        :class="
          isSideMenuExpanded
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        "
        class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-gray-100 p-6 opacity-0 transition-opacity duration-100 ease-in-out will-change-transform"
        @click="toggleSideMenu"
      >
        <ul class="flex h-full flex-col gap-2">
          <li v-for="item in menuItemsFiltered" :key="item">
            <router-link
              v-slot="{ isActive }"
              :to="item.path"
              class="flex h-[55px] items-center whitespace-nowrap rounded-xl border border-gray-100 bg-white px-4 py-3"
              @click.stop="onMenuItemClick(item)"
            >
              <span
                :class="isActive ? 'text-black' : 'text-gray-300'"
                class="font-medium"
              >
                {{ item.title }}
              </span>
            </router-link>
          </li>
        </ul>
        <ul v-if="hasAction()" class="flex flex-col gap-2">
          <li
            class="flex h-[55px] items-center whitespace-nowrap rounded-xl border border-gray-100 bg-white px-4 py-3 font-medium"
          >
            <slot name="action"></slot>
          </li>
        </ul>
      </div>
      <div class="flex h-full flex-col">
        <router-view></router-view>
      </div>
    </section>
    <footer>
      <app-bottom-navigation-bar />
    </footer>
  </div>

  <div v-if="isDesktop" class="flex w-full flex-col bg-gray-50">
    <div class="grid w-full flex-grow grid-cols-10 overflow-hidden">
      <div class="col-span-3 border-r border-gray-100">
        <div class="flex h-full flex-col justify-between">
          <ul class="">
            <li
              v-for="item in menuItemsFiltered"
              :key="item"
              class="border-b border-gray-100 bg-white px-4 py-1"
            >
              <router-link
                v-slot="{ isActive }"
                :to="item.path"
                class="block w-full"
              >
                <span
                  :class="isActive ? 'text-black' : 'text-gray-300'"
                  class="font-medium"
                >
                  {{ item.title }}
                </span>
              </router-link>
            </li>
          </ul>
          <ul v-if="hasAction()">
            <li
              class="border-t border-gray-100 bg-white px-4 py-1 font-medium text-gray-300"
            >
              <slot name="action"></slot>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-7 flex-col overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
    <section class="w-full">
      <slot name="bottom"></slot>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from "vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useRoute } from "vue-router"
import { useSelect } from "@/composables/useSelect2"
import { useOnlineStore } from "@/stores/online.store.js"
import { useUserStore } from "@/stores/user.store.js"

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
const { isSelectableMode } = useSelect()
const onlineStore = useOnlineStore()
const userStore = useUserStore()

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
})

const menuItemsFiltered = computed(() =>
  props.menuItems.filter((item) => !item.hide),
)

const slots = useSlots()
const hasAction = () => !!slots.action

const headerTitle = computed(() => {
  if (isSelectableMode.value) {
    return "Выберите..."
  }
  return props.menuItems.find((item) => route.path.includes(item.path))?.title
})
const isSideMenuExpanded = ref(false)

const toggleSideMenu = () => {
  isSideMenuExpanded.value = !isSideMenuExpanded.value
}

const onMenuItemClick = (item) => {
  toggleSideMenu()
}
</script>

<style></style>
