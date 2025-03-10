<!-- src/components/UpdateNotification.vue -->
<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal-window relative z-50">
      <div
        :aria-hidden="!isVisible"
        class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md"
      >
        <div class="fixed inset-0 z-10 flex w-screen">
          <div class="flex h-full w-full items-center justify-center">
            <div
              class="flex w-4/5 animate-shake flex-col gap-2 rounded-xl bg-white p-4 dark:border dark:border-neutral-800 dark:bg-neutral-900 md:max-w-xs"
              @click.stop
            >
              <h1
                class="whitespace-break-spaces text-center text-xl font-medium dark:text-neutral-200"
              >
                {{ title }}
              </h1>
              <p
                v-if="message"
                class="rounded-xl bg-blue-50 p-4 text-center text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
              >
                {{ message }}
              </p>
              <div class="flex flex-col gap-2">
                <button
                  v-press
                  class="pointer-events-auto flex items-center justify-center rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600 hover:brightness-95 dark:bg-neutral-800 dark:text-neutral-200"
                  @click="updateApp"
                >
                  Обновить
                </button>
                <button
                  v-press
                  class="pointer-events-auto rounded-xl bg-gray-50 px-4 py-3 font-medium text-black hover:brightness-95 dark:bg-black dark:text-neutral-200"
                  @click="closeModal"
                >
                  Позже
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue"

// Состояние модального окна
const isVisible = ref(false)
const title = ref("Доступно обновление")
const message = ref("Новая версия приложения готова. Хотите обновить сейчас?")
const registration = ref(null)

// Функция для показа модального окна
const showModal = (reg) => {
  registration.value = reg
  isVisible.value = true
}

// Функция для закрытия модального окна
const closeModal = () => {
  isVisible.value = false
  registration.value = null
}

// Функция для обновления приложения
const updateApp = () => {
  if (registration.value && registration.value.waiting) {
    registration.value.waiting.postMessage({ type: "SKIP_WAITING" })
  }
  window.location.reload()
}

// Слушаем событие от сервис-воркера
document.addEventListener("swUpdated", (e) => {
  showModal(e.detail)
})
</script>
