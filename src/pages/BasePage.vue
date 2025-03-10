<template>
  <div v-if="!isDesktop" class="@base-page z-50 flex min-h-screen flex-col">
    <div
      v-if="!onlineStore.isOnline"
      class="animate-pulse bg-rose-50 py-1 text-center text-rose-500 dark:bg-rose-500/10 dark:text-rose-200"
    >
      Нет подключения к интернету
    </div>
    <header class="pt-safe">
      <nav
        class="flex h-[55px] flex-col justify-center gap-2 border-b border-gray-100 px-8 py-3 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="flex items-center gap-4">
          <button
            v-if="!isDesktop"
            class="flex items-center"
            @click="$router.back()"
          >
            <span class="material-symbols-rounded">chevron_left</span>
          </button>
          <h1
            class="truncate whitespace-nowrap font-medium dark:text-neutral-200"
          >
            {{ headerTitle }}
          </h1>
        </div>
      </nav>
    </header>

    <section class="relative flex flex-1 flex-col overflow-auto pb-safe">
      <router-view />
    </section>

    <footer class="pb-safe">
      <app-bottom-navigation-bar />
    </footer>
  </div>

  <div v-else class="flex min-h-screen w-full flex-col bg-gray-50">
    <router-view />
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
import { useOnlineStore } from "@/stores/online.store"

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater("sm")
const { isSelectableMode } = useSelect()
const onlineStore = useOnlineStore()

const headerTitle = computed(() => {
  if (isSelectableMode.value) return "Выберите..."
  return route.meta.title || "Open Kassa"
})
</script>

<style scoped>
.min-h-screen {
  box-sizing: border-box;
}
</style>
