<template>
  <div class="z-50 flex min-h-screen flex-col">
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
          <button class="flex items-center" @click="$router.back()">
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
      <slot />
      <div
        v-if="hasFloating()"
        class="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-center px-10 py-6 pb-safe"
      >
        <slot name="floating"></slot>
      </div>
    </section>

    <footer class="pb-safe">
      <app-bottom-navigation-bar />
    </footer>
  </div>
</template>

<script setup>
import { computed, useSlots } from "vue"
import AppBottomNavigationBar from "@/components/mobile/AppBottomNavigationBar.vue"
import { useRoute } from "vue-router"
import { useSelect } from "@/composables/useSelect2"
import { useOnlineStore } from "@/stores/online.store"

const route = useRoute()
const { isSelectableMode } = useSelect()
const onlineStore = useOnlineStore()

const headerTitle = computed(() => {
  if (isSelectableMode.value) return "Выберите..."
  return route.meta.title || "Open Kassa"
})

const slots = useSlots()
const hasFloating = () => !!slots.floating
</script>

<style scoped>
.min-h-screen {
  box-sizing: border-box;
}
</style>
