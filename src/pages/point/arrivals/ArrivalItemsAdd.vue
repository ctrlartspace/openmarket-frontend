<template>
  <a-page title="Новое поступление">
    <template #header>
      <a-button primary @click="addArrival">Сохранить</a-button>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/point/items',
          query: { selectableMode: true },
        }"
        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100 hover:border-neutral-500"
      >
        <div v-if="pointItem">
          <h1 class="text-base font-medium">
            {{ pointItem.code + ", " + pointItem.name }}
          </h1>
          <p class="text-sm text-neutral-400">
            Покупка: {{ pointItem.purchasePrice }} KZT Продажа:
            {{ pointItem.sellingPrice }} KZT
          </p>
        </div>
        <p v-else>Выбрать товар</p>
      </router-link>
      <a-base-input
        id="purchase-price"
        v-model="item.count"
        :disabled="!pointItem"
        label="Количество"
        placeholder="Количество"
        type="text"
        unit="Шт."
      />
    </div>
  </a-page>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import ArrivalService from "@/services/arrivals/items.js"
import { useSelect } from "@/composables/useSelect.js"
import { getPointItem } from "@/services/PointService.js"
import AButton from "@/components/ui/AButton.vue"

const router = useRouter()
const item = ref({ count: 1 })
const { selectedItem: pointItem } = useSelect(getPointItem)

const addArrival = async () => {
  try {
    await ArrivalService.addArrivalItem(item.value)
    await router.push(`/point/items/${pointItem.value.id}`)
  } catch (error) {
    console.log(error)
  }
}

watch(pointItem, (newStoreItem) => {
  item.value.pointItemId = newStoreItem.id
})
</script>

<style lang="scss" scoped></style>
