<template>
  <a-modal title="Новый товар" @handle="onDialogOpen">
    <template #default="{ props }">
      <slot :props="props"></slot>
    </template>
    <template #content="{ closeModal }">
      <form
        class="flex flex-col gap-2"
        @submit.prevent="submitModal(closeModal)"
      >
        <FloatLabel variant="in">
          <InputText
            v-model="item.code"
            :invalid="validationErrors.code"
            fluid
          />
          <label class="text-gray-300">Штрихкод товара</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputText
            v-model="item.name"
            v-autofocus
            :invalid="validationErrors.name"
            fluid
          />
          <label class="text-gray-300">Наименование</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <InputNumber
            v-model="item.sellingPrice"
            :invalid="validationErrors.sellingPrice"
            fluid
            locale="ru-RU"
            suffix=" ₸"
          />
          <label class="text-gray-300">Цена продажи</label>
        </FloatLabel>

        <button
          v-press
          :disabled="isLoading"
          class="pointer-events-auto flex items-center justify-center rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600 hover:brightness-95 dark:bg-blue-500/20 dark:text-neutral-200"
          type="submit"
        >
          <span
            v-if="isLoading"
            class="material-symbols-rounded animate-spin font-semibold"
            >progress_activity</span
          >
          <span v-else> Готово </span>
        </button>

        <button
          v-press
          class="pointer-events-auto rounded-xl bg-gray-50 px-4 py-3 font-medium text-black hover:brightness-95 dark:bg-black dark:text-neutral-200"
          @click="closeModal"
        >
          Отмена
        </button>
      </form>
    </template>
  </a-modal>
</template>
<script setup>
import AModal from "@/components/ui/AModal.vue"
import { useCartStore } from "@/stores/cart.store.js"
import { ref } from "vue"
import { useApiRequest } from "@/composables/useApiRequest.js"
import { useModalStore } from "@/stores/modal.store.js"

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(["success"])

const item = ref({})
const store = useCartStore()
const modal = useModalStore()

const {
  serverData: pointItem,
  validationErrors,
  sendRequest: addPointItem,
  isError,
  errorMessage,
  isLoading,
} = useApiRequest()

const submitModal = async (closeModal) => {
  await addPointItem("post", "/point/items", item.value)
  if (isError.value) {
    modal.show("Ошибка", errorMessage.value)
    return
  }
  store.addItem(pointItem.value)
  closeModal()
  emits("success")
}
const onDialogOpen = () => {
  validationErrors.value = []
  item.value.code = props.code
  item.value.name = props.name
  item.value.purchasePrice = 1
  item.value.sellingPrice = props.sellingPrice
  item.value.count = 1
}
</script>
