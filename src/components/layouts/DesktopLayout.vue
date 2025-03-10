<template>
  <div class="min-h-screen w-full bg-gray-100 dark:bg-black">
    <app-header />
    <div class="md:grid md:grid-cols-10">
      <div
        class="col-span-3 border-r border-gray-200 bg-gray-50/60 pt-safe dark:border-neutral-800 dark:bg-neutral-800/60"
      >
        <div
          v-if="title"
          class="border-b border-gray-100 bg-white px-4 py-1 dark:border-neutral-800 dark:bg-black dark:text-neutral-200"
        >
          <h1 class="font-medium">{{ title }}</h1>
        </div>
        <div class="flex flex-col gap-2 p-6">
          <slot name="header"></slot>
        </div>
      </div>
      <div
        class="no-scrollbar flex flex-1 flex-col overflow-auto pb-safe md:col-span-7"
      >
        <div class="p-6 pb-24">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useSelect } from "@/composables/useSelect2"
import AppHeader from "@/components/AppHeader.vue"

const route = useRoute()
const { isSelectableMode } = useSelect()

const title = computed(() => {
  if (isSelectableMode.value) return "Выберите..."
  return route.meta.title || "Open Kassa"
})
</script>

<style lang="scss" scoped></style>
