<template>
  <a-page title="Новое поступление">
    <template #header>
      <a-modal
        v-if="pointItem"
        #="{ props }"
        :async-operation="addArrival"
        title="Сделать приход?"
      >
        <a-button primary v-bind="props">Сохранить</a-button>
      </a-modal>
    </template>
    <template #floating>
      <a-modal
        v-if="pointItem"
        #="{ props }"
        :async-operation="addArrival"
        title="Сделать приход?"
      >
        <a-button-floating-text primary v-bind="props"
          >Готово
        </a-button-floating-text>
      </a-modal>
    </template>
    <div class="flex flex-col gap-2">
      <router-link
        :to="{
          path: '/point/items',
          query: { selectableMode: true },
        }"
        class="rounded-xl border border-gray-100 bg-white px-4 py-3 md:hover:border-gray-300"
      >
        <div v-if="pointItem">
          <h1 class="font-medium text-blue-600">
            {{ pointItem.name }}
          </h1>
          <p class="text-sm text-gray-400">
            Код: {{ pointItem.code }} <br />
            Покупка: {{ pointItem.purchasePrice }} ₸ Продажа:
            {{ pointItem.sellingPrice }} ₸
          </p>
        </div>
        <p v-else class=" ">Выбрать товар...</p>
      </router-link>

      <div v-if="pointItem" class="flex-auto">
        <label class="mb-2 block font-medium"> Количество</label>
        <InputNumber
          v-model="arrivalData.count"
          fluid
          locale="ru-RU"
          placeholder="0 шт"
          suffix=" шт"
        />
      </div>
    </div>
  </a-page>
</template>

<script setup>
import AButton from "@/components/ui/AButton.vue"
import AButtonFloatingText from "@/components/ui/AButtonFloatingText.vue"
import AModal from "@/components/ui/AModal.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSelect } from "@/composables/useSelect2.js"
import { useApiRequest } from "@/composables/useApiRequest"

const router = useRouter()
const arrivalData = ref({ count: 1 })
const { selectedItem: pointItem } = useSelect()
const { sendRequest } = useApiRequest()

const addArrival = async () => {
  arrivalData.value.pointItemId = pointItem.value.id
  const response = await sendRequest(
    "post",
    "/point/arrivals",
    arrivalData.value,
  )
  if (response) {
    await router.push(`/point/items/${pointItem.value.id}`)
  }
}
</script>

<style lang="scss" scoped></style>
