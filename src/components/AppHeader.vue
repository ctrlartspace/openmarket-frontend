<template>
  <nav v-if="store.isAuthorizedPoint" class="border-b border-gray-100 bg-white">
    <div
      v-if="!onlineStore.isOnline"
      class="animate-pulse bg-rose-50 py-1 text-center text-rose-500"
    >
      Нет подключения к интернету
    </div>
    <ul class="mx-auto flex w-full max-w-[900px] gap-4 px-4 py-1">
      <li v-for="(item, i) in menuItems" :key="i" class="inline">
        <router-link v-slot="{ isActive }" :to="item.path">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium"
          >
            {{ item.title }}
          </span>
        </router-link>
      </li>
      <li class="ml-auto"></li>
      <li v-if="store.point" class="inline w-auto truncate text-gray-300">
        <router-link v-slot="{ isActive }" to="/point">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium"
          >
            {{ store.point.name }}
          </span>
        </router-link>
      </li>
      <li class="inline">
        <a-modal
          #="{ props }"
          :async-operation="store.logOutFromPoint"
          title="Выйти из точки?"
        >
          <a-button danger v-bind="props"> Выход </a-button>
        </a-modal>
      </li>
    </ul>
  </nav>
  <nav
    v-else-if="store.isAuthorizedStore"
    class="border-b border-gray-100 bg-white"
  >
    <ul class="mx-auto flex w-full max-w-[900px] gap-4 px-4 py-1">
      <li class="ml-auto"></li>
      <li>
        <router-link v-slot="{ isActive }" to="/store">
          <span
            :class="isActive ? 'text-black' : 'text-gray-300'"
            class="font-medium"
          >
            Настройки
          </span>
        </router-link>
      </li>

      <li class="inline">
        <a-modal
          #="{ props }"
          :async-operation="store.logOut"
          title="Завершить работу и выйти?"
        >
          <a-button danger v-bind="props">Завершить работу</a-button>
        </a-modal>
      </li>
    </ul>
  </nav>

  <nav v-else class="border-b border-gray-100 bg-white">
    <ul class="mx-auto flex w-full max-w-[900px] gap-4 px-4 py-1">
      <li class="ml-auto"></li>
      <li class="font-medium">Open Kassa</li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user.store"
import { useOnlineStore } from "@/stores/online.store.js"
import AButton from "@/components/ui/AButton.vue"
import AModal from "@/components/ui/AModal.vue"

const onlineStore = useOnlineStore()
const store = useUserStore()

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Смена",
    path: "/work-shifts",
  },
  {
    title: "Продажи",
    path: "/point/sales",
  },
])
</script>

<style scoped></style>
