<template>
  <a-page title="Новое поступление">
    <template #header>
      <a-modal
        v-if="pointItem"
        #="{ props }"
        title="Сделать приход?"
        :async-operation="addArrival"
      >
        <a-button primary v-bind="props">Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        v-if="pointItem"
        #="{ props }"
        title="Сделать приход?"
        :async-operation="addArrival"
      >
        <a-button-floating-text primary v-bind="props"
          >Готово</a-button-floating-text
        >
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/point/items',
          query: { selectableMode: true },
        }"
        class="rounded-xl border border-neutral-100 bg-white px-4 py-3 md:hover:border-neutral-300"
      >
        <div v-if="pointItem">
          <h1 class="font-medium text-blue-600">
            {{ pointItem.storeItem.name }}
          </h1>
          <p class="text-sm text-neutral-400">
            Код: {{ pointItem.storeItem.code }} <br />
            Покупка: {{ pointItem.purchasePrice }} ₸ Продажа:
            {{ pointItem.sellingPrice }} ₸
          </p>
        </div>
        <p class=" " v-else>Выбрать товар...</p>
      </router-link>
      <a-base-input
        v-if="pointItem"
        id="purchase-price"
        v-model="item.count"
        label="Количество"
        placeholder="Количество"
        type="text"
        unit="Шт."
      />
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useSelect } from "@/composables/useSelect2.js"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const item = ref({ count: 1 })
const { selectedItem: pointItem } = useSelect()
const { sendRequest } = useApiRequest()

const addArrival = async () => {
  const response = await sendRequest("post", "/arrivals", item.value)
  if (response) {
    await router.push(`/point/items/${pointItem.value.id}`)
  }
}

watch(pointItem, (newStoreItem) => {
  if (newStoreItem) {
    item.value.pointItemId = newStoreItem.id
  }
})
</script>

<style lang="scss" scoped></style>
