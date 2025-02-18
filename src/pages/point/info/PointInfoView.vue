<template>
  <a-page :loading="isLoading" title="Информация о точке">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="onUpdatePoint"
        title="Сохранить изменения?"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
      <a-modal
        #="{ props }"
        :async-operation="onDeletePointClick"
        title="Удалить точку?"
      >
        <a-button danger v-bind="props"> Удалить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="onUpdatePoint"
        title="Сохранить изменения?"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
      <a-modal
        #="{ props }"
        :async-operation="onDeletePointClick"
        title="Удалить точку?"
      >
        <a-button-floating danger v-bind="props"> delete</a-button-floating>
      </a-modal>
    </template>
    <div v-if="point" class="flex flex-col gap-4">
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Название точки</label>
        <InputText
          v-model="point.name"
          fluid
          placeholder="Название"
          type="text"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          v-press
          :to="item.path"
          class="flex flex-col items-center gap-2 rounded-xl bg-white p-4"
        >
          <span
            class="material-symbols-rounded rounded-xl bg-blue-50 p-2 text-blue-500"
            >{{ item.icon }}</span
          >
          <span>{{ item.title }}</span>
        </router-link>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { computed, onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()

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
    // {
    //   title: "Информация",
    //   icon: "info",
    //   path: "/point/info",
    //   permission: "view_points",
    // },
    {
      title: "Сотрудники",
      icon: "person",
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
      title: "Приход",
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
