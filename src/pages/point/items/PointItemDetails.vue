<template>
  <a-page title="Товар">
    <template #header>
      <a-button neutral @click="addItemToCart">
        <span class="material-symbols-outlined text-[26px]">shopping_cart</span>
        В корзину
      </a-button>
      <a-button success @click="applySelect(item, '/point/arrivals/add')">
        <span class="material-symbols-outlined">add</span>
        Приход
      </a-button>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updatePointItem"
      >
        <a-button primary v-bind="props"> Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-button-floating @click="addItemToCart"
        >shopping_cart
      </a-button-floating>
      <a-button-floating @click="applySelect(item, '/point/arrivals/add')"
        >add
      </a-button-floating>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updatePointItem"
      >
        <a-button-floating v-bind="props"> save</a-button-floating>
      </a-modal>
    </template>
    <div v-if="item" class="flex flex-col gap-2">
      <router-link
        v-if="item.storeItem"
        :to="{ path: '/store/items/' + item.storeItem.id }"
        class="rounded-xl border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-600 md:rounded-lg"
      >
        <h1 class="text-lg font-medium md:text-base">
          {{ item.storeItem.code + ", " + item.storeItem.name }}
        </h1>
        <p class="text-md text-neutral-400 md:text-sm">
          Покупка: {{ item.storeItem.purchasePrice }} ₸ Продажа:
          {{ item.storeItem.sellingPrice }} ₸
        </p>
      </router-link>
      <a-base-input
        id="purchase-price"
        v-model="item.purchasePrice"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="₸"
      />
      <a-base-input
        id="selling-price"
        v-model="item.sellingPrice"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="₸"
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
    </div>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import PointService from "@/services/PointService.js"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import AModal from "@/components/ui/AModal.vue"
import { useSelect } from "@/composables/useSelect2"
import { useCartStore } from "@/stores/cart.store"

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const item = ref({})
const { applySelect } = useSelect()

const addItemToCart = () => {
  cartStore.addItem(item.value)
  router.push("/cart")
}
const getPointItem = async (id) => {
  try {
    item.value = await PointService.getPointItem(id)
  } catch (error) {
    console.error(error)
  }
}

const updatePointItem = async () => {
  try {
    if (item.value.id) {
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
