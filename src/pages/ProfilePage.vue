<template>
  <div class="">
    <div
      class="grid grid-cols-10 rounded-xl border border-gray-200 bg-white md:gap-2 md:rounded-lg md:p-4"
    >
      <div class="col-span-10 flex flex-col gap-2 md:col-span-4">
        {{ profileData }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getProfile } from "@/services/UserService.js"

const profileData = ref(null)

onMounted(async () => {
  const response = await getProfile()
  profileData.value = response
})
</script>

<style></style>
