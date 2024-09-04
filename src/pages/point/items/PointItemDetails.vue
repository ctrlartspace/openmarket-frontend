<template>
  <a-page title="Товар">
    <template #header>
      <a-link
        :to="{ path: '/arrivals/items/add', query: { selectedItem: item.id } }"
        success
        >Приход
      </a-link>
      <a-button primary @click="updatePointItem"> Сохранить</a-button>
    </template>
    <div v-if="item" class="flex flex-col gap-2">
      <div
        v-if="item.storeItem"
        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100"
      >
        <h1 class="text-base font-medium">
          {{ item.storeItem.code + ", " + item.storeItem.name }}
        </h1>
        <p class="text-sm text-neutral-400">
          Покупка: {{ item.storeItem.purchasePrice }} KZT Продажа:
          {{ item.storeItem.sellingPrice }} KZT
        </p>
      </div>
      <!--      <router-link-->
      <!--        v-if="item.storeItem"-->
      <!--        :to="{ name: 'storeItem', params: { id: item.storeItem.id } }"-->
      <!--        class="px-4 py-2 border border-neutral-300 rounded bg-neutral-100 hover:border-neutral-500"-->
      <!--      >-->
      <!--        <h1 class="text-base font-medium">-->
      <!--          {{ item.storeItem.code + ", " + item.storeItem.name }}-->
      <!--        </h1>-->
      <!--        <p class="text-sm text-neutral-400">-->
      <!--          Покупка: {{ item.storeItem.purchasePrice }} KZT Продажа:-->
      <!--          {{ item.storeItem.sellingPrice }} KZT-->
      <!--        </p>-->
      <!--      </router-link>-->
      <a-base-input
        id="purchase-price"
        v-model="item.purchasePrice"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="KZT"
      />
      <a-base-input
        id="selling-price"
        v-model="item.sellingPrice"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="KZT"
      />
      <a-base-input
        id="count"
        v-model="item.count"
        label="Количество"
        placeholder="Количество"
        readonly
        type="text"
        unit="Шт."
      />
      <a-base-input
        id="filters"
        v-model="item.filters"
        label="Фильтры"
        placeholder="Фильтры"
        type="text"
        @click="$router.push(filterPathMulti)"
      />
    </div>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointService from "@/services/PointService.js"
import { useFilters } from "@/composables/filters.js"
import ALink from "@/components/ui/ALink.vue"
import AButton from "@/components/ui/AButton.vue"

const route = useRoute()
const item = ref({})
const { filters, filterPathMulti } = useFilters()

const getPointItem = async (id) => {
  try {
    item.value = await PointService.getPointItem(id)
    if (filters.value) {
      item.value.filters = filters
    } else {
      filters.value = item.value.filters
    }
  } catch (error) {
    console.error(error)
  }
}

const updatePointItem = async () => {
  try {
    if (item.value.id) {
      item.value.filters = filters.value
      const updatedItem = await PointService.updatePointItem(
        item.value.id,
        item.value,
      )
      const { id } = updatedItem
      await getPointItem(id)
    } else {
      console.log("id not found")
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await getPointItem(id)
  }
})
</script>

<style lang="scss" scoped></style>
