<template>
  <a-page :loading="isLoading" title="Информация о точке">
    <!--    <template #header>-->
    <!--      <a-modal-->
    <!--        #="{ props }"-->
    <!--        :async-operation="onUpdatePoint"-->
    <!--        title="Сохранить изменения?"-->
    <!--      >-->
    <!--        <button-->
    <!--          class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3"-->
    <!--          v-bind="props"-->
    <!--        >-->
    <!--          <span class="material-symbols-rounded">save</span>-->
    <!--          <span class="font-medium"> Сохранить </span>-->
    <!--        </button>-->
    <!--      </a-modal>-->
    <!--      <a-modal-->
    <!--        #="{ props }"-->
    <!--        :async-operation="onDeletePointClick"-->
    <!--        title="Удалить точку?"-->
    <!--      >-->
    <!--        <button-->
    <!--          class="flex w-full gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-red-500"-->
    <!--          v-bind="props"-->
    <!--        >-->
    <!--          <span class="material-symbols-rounded">delete</span>-->
    <!--          <span class="font-medium"> Удалить </span>-->
    <!--        </button>-->
    <!--      </a-modal>-->
    <!--    </template>-->
    <!--    <template #floating>-->
    <!--      <a-modal-->
    <!--        #="{ props }"-->
    <!--        :async-operation="onUpdatePoint"-->
    <!--        title="Сохранить изменения?"-->
    <!--      >-->
    <!--        <a-button-floating v-bind="props"> save</a-button-floating>-->
    <!--      </a-modal>-->
    <!--      <a-modal-->
    <!--        #="{ props }"-->
    <!--        :async-operation="onDeletePointClick"-->
    <!--        title="Удалить точку?"-->
    <!--      >-->
    <!--        <a-button-floating danger v-bind="props"> delete</a-button-floating>-->
    <!--      </a-modal>-->
    <!--    </template>-->
    <div v-if="point" class="flex flex-col gap-4">
      <div class="flex-auto">
        <InputText
          v-model="point.name"
          fluid
          placeholder="Название"
          type="text"
        />
      </div>
      <a-list :items="menuItems" title-field="title">
        <template #title="{ item }">
          <router-link :to="item.path" class="flex items-center gap-4">
            <span class="material-symbols-rounded">{{ item.icon }}</span>
            <span class="font-medium">
              {{ item.title }}
            </span>
            <span class="material-symbols-rounded ml-auto">chevron_right</span>
          </router-link>
        </template>
      </a-list>

      <button
        v-if="themeStore.isDark"
        class="flex w-full gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3 dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-200"
        @click="themeStore.toggleTheme"
      >
        <span class="material-symbols-rounded">light_mode</span>
        <span class="font-medium"> Светлая тема</span>
      </button>

      <button
        v-else
        class="flex w-full gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3 dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-200"
        @click="themeStore.toggleTheme"
      >
        <span class="material-symbols-rounded">dark_mode</span>
        <span class="font-medium"> Темная тема</span>
      </button>

      <a-modal
        #="{ props }"
        :async-operation="store.logOutFromPoint"
        title="Выйти из точки?"
      >
        <button
          class="flex w-full gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3 text-red-500 dark:border-neutral-900 dark:bg-neutral-900 dark:text-red-400"
          v-bind="props"
        >
          <span class="material-symbols-rounded">exit_to_app</span>
          <span class="font-medium"> Выход из точки</span>
        </button>
      </a-modal>
    </div>
  </a-page>
</template>

<script setup>
import AModal from "@/components/ui/AModal.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { useUserStore } from "@/stores/user.store"
import AList from "@/components/ui/AList.vue"
import { useThemeStore } from "@/stores/theme.store.js"

const store = useUserStore()
const themeStore = useThemeStore()

const { serverData: point, sendRequest, isLoading } = useApiRequest()
const { sendRequest: deletePoint } = useApiRequest()
const { sendRequest: updatePoint } = useApiRequest()

const onDeletePointClick = async () => {
  if (!point.value) {
    return
  }

  const response = await deletePoint(
    "delete",
    "/store/points/" + point.value.id,
  )
  if (response) {
    await store.logOutFromPoint()
  }
}

const menuItems = computed(() =>
  [
    {
      title: "Сотрудники",
      icon: "group",
      path: "/point/users",
      permission: "view_users",
    },
    {
      title: "Товары",
      icon: "format_list_bulleted",
      path: "/point/items",
      permission: "view_products",
    },
    {
      title: "Продажи",
      icon: "arrow_upward",
      path: "/point/sales",
      permission: "view_sales",
    },
    {
      title: "Поступления",
      icon: "arrow_downward",
      path: "/point/arrivals",
      permission: "view_arrivals",
    },
  ].filter((item) => store.hasPermission(item.permission)),
)

const onUpdatePoint = async () => {
  await updatePoint("put", "/point", {
    name: point.value.name,
  })
}

onMounted(async () => {
  await sendRequest("get", "/point")
})
</script>

<style lang="scss" scoped></style>
