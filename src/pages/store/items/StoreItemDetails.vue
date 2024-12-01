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
        <a-button-floating v-if="point" v-bind="props">add</a-button-floating>
      </a-modal>
      <a-modal
        #="{ props }"
        title="Сохранить изменения?"
        :async-operation="updateStoreItem"
      >
        <a-button-floating v-bind="props">save</a-button-floating>
      </a-modal>
    </template>
    <template v-if="isError" #error>{{ errorMessage }}</template>
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
            <span class="material-symbols-rounded">print</span>
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
      <div class="flex gap-2">
        <a-base-input
          v-if="itemState.purchasePrice"
          class="w-full"
          id="purchase-price"
          v-model="itemState.purchasePrice"
          label="Покупка"
          placeholder="Цена покупки"
          type="text"
          unit="₸"
        />
        <a-base-input
          class="w-full"
          id="selling-price"
          v-model="itemState.sellingPrice"
          label="Продажа"
          placeholder="Цена продажи"
          type="text"
          unit="₸"
        />
      </div>
      <a-base-input
        id="filters"
        v-model="filters"
        label="Категории"
        placeholder="Выбрать"
        type="text"
        @click="$router.push(filterPathMulti)"
      />
      <div
        class="flex flex-col gap-2"
        v-if="itemState.availability?.length > 0"
      >
        <label class="">Наличие в точках</label>
        <a-list
          :items="itemState.availability"
          title-field="pointName"
          description-field="count"
          description-hint="шт."
        />
      </div>
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
import AList from "@/components/ui/AList.vue"

const route = useRoute()
const router = useRouter()
const { filters, filterPathMulti } = useFilters()
const { point } = useUserStore()
const {
  serverData: itemState,
  sendRequest,
  isLoading,
  isError,
  errorMessage,
} = useApiRequest()

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
    // await sendRequest("put", "/store/items/" + id, itemState.value)
  }
}

const addPointItem = async () => {
  const data = {
    storeItemId: itemState.value.id,
  }

  const response = await sendRequest("post", "/point/items", data)
  if (response) {
    await router.push({ path: "/point/items/" + response.data.data.id })
  }
  console.log("sfsdf")
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
