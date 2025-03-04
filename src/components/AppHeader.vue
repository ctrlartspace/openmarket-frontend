<template>
  <nav
    v-if="store.isAuthorizedPoint"
    class="border-b border-gray-100 bg-white dark:border-neutral-800 dark:bg-black"
  >
    <div
      v-if="!onlineStore.isOnline"
      class="animate-pulse bg-rose-50 py-1 text-center text-rose-500"
    >
      Нет подключения к интернету
    </div>
    <ul class="mx-auto flex w-full max-w-[900px] gap-3 px-4 py-1">
      <li v-for="(item, i) in menuItems" :key="i" class="inline">
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            :class="
              isActive
                ? 'text-black dark:text-neutral-200'
                : 'text-gray-300 dark:text-neutral-600'
            "
            class="font-medium"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
      <li class="ml-auto"></li>
      <li
        v-if="store.user"
        class="inline-flex w-auto items-center gap-1 truncate font-medium text-gray-300 dark:text-neutral-600"
      >
        {{ store?.user?.fullName }}
      </li>

      <li>
        <router-link v-slot="{ isActive }" to="/ai">
          <span
            :class="
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-300 dark:text-neutral-600'
            "
            class="font-medium"
          >
            Чат-бот
          </span>
        </router-link>
      </li>
      <li
        v-if="store.point"
        class="inline-flex w-auto truncate font-medium text-gray-300 dark:text-neutral-500"
      >
        <router-link
          v-slot="{ isActive }"
          class="inline-flex items-center gap-1"
          to="/point"
        >
          <span
            :class="
              isActive
                ? 'text-black dark:text-neutral-200'
                : 'text-gray-300 dark:text-neutral-600'
            "
            class="material-symbols-rounded"
            >store</span
          >
          <span
            :class="
              isActive
                ? 'text-black dark:text-neutral-200'
                : 'text-gray-300 dark:text-neutral-600'
            "
          >
            {{ store.point.name }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
  <nav
    v-else-if="store.isAuthorizedStore"
    class="border-b border-gray-100 bg-white dark:border-neutral-800 dark:bg-black"
  >
    <ul class="mx-auto flex w-full max-w-[900px] gap-3 px-4 py-1">
      <li class="ml-auto"></li>

      <li
        v-if="store.user"
        class="inline-flex w-auto items-center gap-1 truncate font-medium text-gray-300 dark:text-neutral-600"
      >
        {{ store?.user?.fullName }}
      </li>

      <li>
        <router-link v-slot="{ isActive }" to="/ai">
          <span
            :class="
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-300 dark:text-neutral-600'
            "
            class="font-medium"
          >
            Чат-бот
          </span>
        </router-link>
      </li>
      <li>
        <router-link v-slot="{ isActive }" to="/store">
          <span
            :class="
              isActive
                ? 'text-black dark:text-neutral-200'
                : 'text-gray-300 dark:text-neutral-600'
            "
            class="font-medium"
          >
            Настройки
          </span>
        </router-link>
      </li>
    </ul>
  </nav>

  <nav
    v-else
    class="border-b border-gray-100 bg-white dark:border-neutral-800 dark:bg-black"
  >
    <ul class="mx-auto flex w-full max-w-[900px] gap-4 px-4 py-1">
      <li class="ml-auto"></li>
      <li class="font-medium dark:text-neutral-200">Open Kassa</li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useOnlineStore } from "@/stores/online.store.js"

const onlineStore = useOnlineStore()
const store = useUserStore()

const menuItems = computed(() =>
  [
    {
      title: "Корзина",
      path: "/cart",
      permission: "view_sales",
    },
    {
      title: "Смена",
      path: "/work-shifts",
      permission: "view_shifts",
    },
  ].filter((item) => store.hasPermission(item.permission)),
)
</script>

<style scoped></style>
