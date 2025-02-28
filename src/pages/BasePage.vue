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
        class="flex h-[55px] flex-col justify-center gap-2 border-b border-gray-100 px-8 py-3 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="flex items-center gap-4">
          <h1
            class="truncate whitespace-nowrap font-medium dark:text-neutral-200"
          >
            {{ headerTitle }}
          </h1>
        </div>
      </nav>
    </header>

    <section class="relative flex flex-1 flex-col overflow-auto">
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
      <div class="col-span-10 flex-col overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
    <section class="w-full">
      <slot name="bottom"></slot>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useRoute } from "vue-router"
import { useSelect } from "@/composables/useSelect2"
import { useOnlineStore } from "@/stores/online.store.js"

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm") // only smaller than lg
const { isSelectableMode } = useSelect()
const onlineStore = useOnlineStore()

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
})

const headerTitle = computed(() => {
  if (isSelectableMode.value) {
    return "Выберите..."
  }
  return props.menuItems.find((item) => route.path.includes(item.path))?.title
})
</script>

<style></style>
