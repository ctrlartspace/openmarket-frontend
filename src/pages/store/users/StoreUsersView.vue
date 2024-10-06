<template>
  <a-page>
    <template #header>
      <a-link primary to="/store/users/add">Добавить</a-link>
    </template>
    <template #floating>
      <a-link-floating primary to="/store/users/add">add</a-link-floating>
    </template>
    <a-list
      :items="storeUsers"
      title-field="name"
      @on-item-click="onItemClick"
    ></a-list>
  </a-page>
</template>

<script setup>
import { onMounted, ref } from "vue"
import StoreService from "@/services/StoreService"
import AList from "@/components/ui/AList.vue"
import ALink from "@/components/ui/ALink.vue"
import ALinkFloating from "@/components/ui/ALinkFloating.vue"
import { useSelect } from "@/composables/useSelect2.js"

const storeUsers = ref([])
const { isSelectableMode, applySelect } = useSelect()

const getStoreUsers = async () => {
  try {
    storeUsers.value = await StoreService.getStoreUsers()
  } catch (error) {
    console.log(error)
  }
}

const onItemClick = (item) => {
  if (isSelectableMode.value) {
    applySelect(item)
  } else {
    // router.push(`/store/items/${item.id}`)
  }
}

onMounted(() => {
  getStoreUsers()
})
</script>

<style lang="scss" scoped></style>
