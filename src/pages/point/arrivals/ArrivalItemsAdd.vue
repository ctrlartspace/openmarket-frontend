<template>
  <a-page title="Новое поступление">
    <template #header>
      <a-button primary @click="addArrival">Сохранить</a-button>
    </template>
    <template #floating>
      <a-button-floating primary @click="addArrival">save</a-button-floating>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/point/items',
          query: { selectableMode: true },
        }"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-500 md:rounded-lg"
      >
        <div v-if="pointItem">
          <h1 class="text-lg font-medium md:text-base">
            {{ pointItem.storeItem.code + ", " + pointItem.storeItem.name }}
          </h1>
          <p class="text-md text-neutral-400 md:text-sm">
            Покупка: {{ pointItem.purchasePrice }} ₸ Продажа:
            {{ pointItem.sellingPrice }} ₸
          </p>
        </div>
        <p class="text-lg md:text-base" v-else>Выбрать товар...</p>
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
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import ArrivalService from "@/services/arrivals/items.js"
import { useSelect } from "@/composables/useSelect2.js"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"

const router = useRouter()
const item = ref({ count: 1 })
const { selectedItem: pointItem } = useSelect()

const addArrival = async () => {
  try {
    await ArrivalService.addArrivalItem(item.value)
    await router.push(`/point/items/${pointItem.value.id}`)
  } catch (error) {
    console.log(error)
  }
}

watch(pointItem, (newStoreItem) => {
  if (newStoreItem) {
    item.value.pointItemId = newStoreItem.id
  }
})
</script>

<style lang="scss" scoped></style>
