<template>
  <a-page title="Товар" :loading="isLoading">
    <template #header>
      <a-modal
        #="{ props }"
        title="Добавить в точку?"
        :async-operation="addPointItem"
      >
        <a-button v-if="point" accent v-bind="props"
          >Добавить в точку
        </a-button>
      </a-modal>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updateStoreItem"
      >
        <a-button primary v-bind="props">Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        title="Добавить в точку?"
        :async-operation="addPointItem"
      >
        <a-button-floating v-if="point" accent v-bind="props"
          >add_circle
        </a-button-floating>
      </a-modal>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updateStoreItem"
      >
        <a-button-floating v-bind="props">save</a-button-floating>
      </a-modal>
    </template>
    <div v-if="itemState" class="flex flex-col gap-2">
      <a-base-input
        id="article"
        v-model="itemState.code"
        label="Код товара"
        placeholder="Код товара"
        type="text"
        ><template #action>
          <button
            type="button"
            class="flex items-center"
            @click="onGenerateBarcodeClick"
          >
            <span class="material-symbols-outlined">print</span>
          </button>
        </template></a-base-input
      >
      <a-base-input
        id="name"
        v-model="itemState.name"
        label="Наименование"
        placeholder="Наименование"
        type="text"
      />
      <a-base-input
        id="purchase-price"
        v-model="itemState.purchasePrice"
        label="Цена покупки"
        placeholder="Цена покупки"
        type="text"
        unit="₸"
      />
      <a-base-input
        id="selling-price"
        v-model="itemState.sellingPrice"
        label="Цена продажи"
        placeholder="Цена продажи"
        type="text"
        unit="₸"
      />
      <a-base-input
        id="filters"
        v-model="filters"
        label="Категории"
        placeholder="Выбрать"
        type="text"
        @click="$router.push(filterPathMulti)"
      />
    </div>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import ABaseInput from "@/components/ui/ABaseInput.vue"
import AButton from "@/components/ui/AButton.vue"
import AButtonFloating from "@/components/ui/AButtonFloating.vue"
import { useFilters } from "@/composables/filters.js"
import AModal from "@/components/ui/AModal.vue"
import { useUserStore } from "@/stores/user.store.js"
import { generateBarcodePDF } from "@/utils/barcodeGenerator"
import { useApiRequest } from "@/composables/useApiRequest"

const route = useRoute()
const router = useRouter()
const { filters, filterPathMulti } = useFilters()
const { point } = useUserStore()
const { serverData: itemState, sendRequest, isLoading } = useApiRequest()

const fetchStoreItemCall = async (id) => {
  await sendRequest("get", "/store/items/" + id)
  if (filters.value) {
    itemState.value.filters = filters
  } else {
    filters.value = itemState.value.filters
  }
}

const updateStoreItem = async () => {
  const id = itemState.value.id
  if (id) {
    itemState.value.filters = filters.value
    await sendRequest("put", "/store/items/" + id, itemState.value)
  }
}

const addPointItem = async () => {
  try {
    const data = {
      storeItemId: itemState.value.id,
      sellingPrice: itemState.value.sellingPrice,
      purchasePrice: itemState.value.purchasePrice,
    }

    const response = await sendRequest("post", "/point/items", data)
    if (response) {
      await router.push({ path: "/point/items/" + response.data.data.id })
    }
  } catch (error) {
    console.log(error)
  }
}

const onGenerateBarcodeClick = () => {
  generateBarcodePDF(itemState.value.code)
}

onMounted(() => {
  const id = route.params.id
  if (id) {
    fetchStoreItemCall(id)
  }
})
</script>

<style lang="scss" scoped></style>
