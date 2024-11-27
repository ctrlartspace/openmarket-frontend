<template>
  <aside>
    <div class="flex flex-col">
      <div class="flex w-full items-center justify-between">
        <!-- <span class="material-symbols-rounded md:text-[24px]">schedule</span> -->
        <span class="text-gray-300"> Касса: </span>
        <span> #1</span>
      </div>
      <div class="flex w-full items-center justify-between">
        <!-- <span class="material-symbols-rounded md:text-[24px]">schedule</span> -->
        <span class="text-gray-300"> Время работы:</span>
        <span>
          {{ calculatedTime }}
        </span>
      </div>
      <div class="flex w-full items-center justify-between">
        <!-- <span class="material-symbols-rounded md:text-[24px]">schedule</span> -->
        <span class="text-gray-300"> Продавец:</span>
        <span> Аман </span>
      </div>
      <div class="flex w-full items-center justify-between">
        <!-- <span class="material-symbols-rounded md:text-[24px]">schedule</span> -->
        <span class="text-gray-300"> Сумма:</span>
        <span> 8000 </span>
      </div>
      <div>
        <button
          class="mt-2 flex w-full items-center justify-center gap-2 rounded border border-gray-200 px-4 py-3 font-medium text-gray-300 hover:border-black hover:text-black"
        >
          Заблокировать
          <span class="material-symbols-rounded md:text-[24px]">lock</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue"

const startTime = ref(new Date("07.19.2024"))
const calculatedTime = ref("00:00:00")

const elapsedTime = (startTime) => {
  const start = new Date(startTime)

  const now = new Date()

  let timeDiff = now - start

  timeDiff = Math.floor(timeDiff / 1000)

  const hours = Math.floor(timeDiff / 3600)
  timeDiff %= 3600
  const minutes = Math.floor(timeDiff / 60)
  const seconds = timeDiff % 60

  const formattedHours = hours < 10 ? "0" + hours : hours
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds

  const elapsedTimeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  return elapsedTimeString
}
const startTimer = () => {
  setInterval(() => {
    calculatedTime.value = elapsedTime(startTime.value)
  }, 1000)
}

onMounted(() => {
  startTimer()
})
</script>

<style scoped></style>
