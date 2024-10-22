<template>
  <a-page title="Информация о точке" :loading="isLoading">
    <template #header>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updatePointItem"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
      <a-modal
        #="{ props }"
        title="Удалить точку?"
        :async-operation="onDeletePointClick"
      >
        <a-button danger v-bind="props"> Удалить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updatePointItem"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
      <a-modal
        #="{ props }"
        title="Удалить точку?"
        :async-operation="onDeletePointClick"
      >
        <a-button-floating danger v-bind="props"> delete</a-button-floating>
      </a-modal>
    </template>
    <div v-if="point" class="flex flex-col gap-2">
      <a-base-input
        v-model="point.name"
        label="Название "
        placeholder="Название "
        type="text"
      />
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import { onMounted } from "vue"
import { useApiRequest } from "@/composables/useApiRequest"
import { useUserStore } from "@/stores/user.store"

const store = useUserStore()

const { serverData: point, sendRequest, isLoading } = useApiRequest()
const { sendRequest: deletePoint } = useApiRequest()

const onDeletePointClick = async () => {
  if (!point.value) {
    return
  }

  const response = await deletePoint(
    "delete",
    "/store/points/" + point.value.id,
  )
  if (response) {
    store.logOutFromPoint()
  }
}

onMounted(async () => {
  await sendRequest("get", "/point")
})
</script>

<style lang="scss" scoped></style>
