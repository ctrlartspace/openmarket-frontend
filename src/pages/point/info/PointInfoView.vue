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
    <div v-if="point" class="flex flex-col gap-2">
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Название точки</label>
        <InputText
          v-model="point.name"
          fluid
          placeholder="Название"
          type="text"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { onMounted } from "vue"
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
    store.logOutFromPoint()
  }
}

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
