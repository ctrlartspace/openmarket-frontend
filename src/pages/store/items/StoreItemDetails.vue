<template>
  <a-page :loading="isLoading" title="Товар">
    <template #header>
      <a-modal
        #="{ props }"
        :async-operation="addPointItem"
        title="Добавить в точку?"
      >
        <a-button v-if="point" accent v-bind="props"
          >Добавить в точку
        </a-button>
      </a-modal>
      <a-modal
        #="{ props }"
        :async-operation="updateStoreItem"
        title="Сохранить изменения?"
      >
        <a-button primary v-bind="props">Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        #="{ props }"
        :async-operation="addPointItem"
        title="Добавить в точку?"
      >
        <a-button-floating v-if="point" v-bind="props">add</a-button-floating>
      </a-modal>
      <a-modal
        #="{ props }"
        :async-operation="updateStoreItem"
        title="Сохранить изменения?"
      >
        <a-button-floating v-bind="props">save</a-button-floating>
      </a-modal>
    </template>
    <template v-if="isError" #error>{{ errorMessage }}</template>
    <div v-if="itemState" class="flex flex-col gap-2">
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Код товара </label>
        <InputGroup>
          <InputText v-model="itemState.code" type="text" />
          <InputGroupAddon>
            <Button
              severity="secondary"
              variant="text"
              @click="onGenerateBarcodeClick"
            >
              <template #icon>
                <span class="material-symbols-rounded">print</span>
              </template>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div class="flex-auto">
        <label class="mb-2 block font-medium"> Наименование </label>
        <InputText v-model="itemState.name" fluid type="text" />
      </div>
      <div class="flex gap-2">
        <div v-if="itemState.purchasePrice" class="flex-auto">
          <label class="mb-2 block font-medium"> Покупка </label>
          <InputNumber
            v-model="itemState.purchasePrice"
            fluid
            placeholder="Цена покупки"
            suffix=" ₸"
          />
        </div>
        <div class="flex-auto">
          <label class="mb-2 block font-medium"> Продажа </label>
          <InputNumber
            v-model="itemState.sellingPrice"
            fluid
            placeholder="Цена продажи"
            suffix=" ₸"
          />
        </div>
      </div>
      <!--      <a-base-input-->
      <!--        id="filters"-->
      <!--        v-model="filters"-->
      <!--        label="Категории"-->
      <!--        placeholder="Выбрать"-->
      <!--        type="text"-->
      <!--        @click="$router.push(filterPathMulti)"-->
      <!--      />-->
      <div v-if="itemState.availability?.length > 0" class="mt-4 flex-auto">
        <label class="mb-2 block font-medium">Наличие в точках</label>
        <a-list
          :items="itemState.availability"
          description-field="count"
          description-hint="шт."
          title-field="pointName"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
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
    await sendRequest("put", "/store/items/" + id, itemState.value)
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
