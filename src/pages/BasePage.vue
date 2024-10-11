<template>
  <div v-if="!isDesktop" class="@base-page z-50 flex h-full flex-col">
    <header>
      <nav>
        <div
          class="flex items-center border-b border-neutral-300 bg-white px-4 py-2"
        >
          <div class="absolute left-0 right-0">
            <div class="px- flex justify-between px-4">
              <button class="flex items-center" @click="$router.back">
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
              <button class="flex items-center" @click="toggleSideMenu">
                <span
                  v-if="!isSideMenuExpanded"
                  class="material-symbols-outlined"
                  >menu</span
                >
                <span v-else class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          <div class="absolute"></div>
          <h2 class="w-full text-center text-lg font-medium">
            {{ headerTitle }}
          </h2>
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
        class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-neutral-100 p-4 opacity-0 transition-opacity duration-100 ease-in-out will-change-transform"
        @click="toggleSideMenu"
      >
        <ul class="flex h-full flex-col gap-2">
          <li
            v-for="item in menuItems"
            :key="item"
            class="whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-2"
          >
            <router-link
              class="block w-full"
              v-slot="{ isActive }"
              :to="item.path"
              @click.stop="onMenuItemClick(item)"
            >
              <span
                :class="isActive ? 'text-black' : 'text-gray-300'"
                class="text-lg font-medium md:text-base"
              >
                {{ item.title }}
              </span>
            </router-link>
          </li>
        </ul>
        <ul v-if="hasAction()" class="flex flex-col gap-2">
          <li
            class="whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-2 font-medium"
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

  <div v-if="isDesktop" class="flex w-full flex-col">
    <div class="grid w-full flex-grow grid-cols-10 overflow-hidden">
      <div class="col-span-3 border-r border-neutral-300">
        <div class="flex h-full flex-col justify-between">
          <ul class="">
            <li
              v-for="item in menuItems"
              :key="item"
              class="border-b border-neutral-300 bg-white px-4 py-1"
            >
              <router-link v-slot="{ isActive }" :to="item.path">
                <span
                  :class="isActive ? 'text-black' : 'text-gray-300'"
                  class="text-base font-medium"
                >
                  {{ item.title }}
                </span>
              </router-link>
            </li>
          </ul>
          <ul v-if="hasAction()">
            <li
              class="border-t border-neutral-300 bg-white px-4 py-1 text-base font-medium text-gray-300"
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

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
const { isSelectableMode } = useSelect()

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
})

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
