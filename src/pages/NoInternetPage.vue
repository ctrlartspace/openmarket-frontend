<template>
  <div
    class="flex h-full w-full items-center justify-center text-lg md:text-base"
  >
    Нет подключения к интернету
  </div>
</template>
<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
onMounted(() => {
  if (navigator.onLine) {
    router.push("/")
  }
})
</script>
