<template>
  <a-page title="Добавить сотрудника">
    <template #header>
      <button class="text-base font-medium text-blue-600" @click="addPointUser">
        Сохранить
      </button>
    </template>
    <a-select v-model="selectedUserId" :items="storeUsers" />
  </a-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import PointUserService from "@/services/point/users.js"
import StoreService from "@/services/StoreService"
import ASelect from "@/components/ui/ASelect.vue"

const router = useRouter()
const selectedUserId = ref(null)
const storeUsers = ref([])

const getStoreUsers = async () => {
  try {
    storeUsers.value = await StoreService.getStoreUsers()
  } catch (error) {
    console.error(error)
  }
}

const addPointUser = async () => {
  try {
    if (selectedUserId.value) {
      await PointUserService.addPointUser(selectedUserId.value)
      router.push("/point/users")
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getStoreUsers()
})
</script>

<style lang="scss" scoped></style>
