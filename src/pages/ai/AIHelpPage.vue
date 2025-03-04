<template>
  <a-page no-padding>
    <template #header>
      <Button fluid @click="$router.back()">
        <span class="material-symbols-rounded">arrow_back</span>
        <span class="font-medium"> Назад</span>
      </Button>
    </template>

    <div class="relative h-full w-full p-6">
      <div class="flex h-full w-full flex-col gap-4 rounded-xl">
        <!--        <div v-if="lastMessage" class="sticky top-6">-->
        <!--          <h1 class="mb-2 px-4 text-gray-400 dark:text-neutral-600">Вопрос</h1>-->
        <!--          <div-->
        <!--            class="rounded-xl bg-white p-6 font-medium text-blue-600 dark:bg-neutral-900 dark:text-blue-400"-->
        <!--          >-->
        <!--            <p class="mb-2">-->
        <!--              {{ lastMessage }}-->
        <!--            </p>-->

        <!--            <button-->
        <!--              :disabled="isLoading"-->
        <!--              class="aspect-square h-full rounded-xl bg-gray-50 p-2 text-gray-600 hover:text-black dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white"-->
        <!--              @click="editMessage"-->
        <!--            >-->
        <!--              <span class="material-symbols-rounded">edit</span>-->
        <!--            </button>-->
        <!--          </div>-->
        <!--        </div>-->

        <div class="mb-16 overflow-auto rounded-xl">
          <h1 class="mb-2 px-4 text-gray-400 dark:text-neutral-600">Ответ</h1>
          <div
            :class="{ 'animate-pulse': isLoading }"
            class="whitespace-pre-line rounded-xl bg-white p-6 text-black dark:bg-neutral-900 dark:text-neutral-200"
          >
            <p v-if="isLoading" class="flex items-center">
              <span class="material-symbols-rounded animate-spin font-semibold"
                >progress_activity</span
              >
            </p>
            <p
              v-else-if="!lastMessage"
              class="text-black dark:text-neutral-200"
            >
              Спросите у меня что-нибудь.
            </p>
            <div v-else>
              <span v-for="(part, index) in parsedServerData" :key="index">
                <router-link
                  v-if="part.type === 'link'"
                  :to="part.to"
                  class="font-medium text-blue-600 dark:text-blue-400"
                >
                  {{ part.text }}
                </router-link>
                <strong v-else-if="part.type === 'bold'">{{
                  part.text
                }}</strong>
                <span v-else>{{ part.text }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 w-full p-6">
        <div class="rounded-xl">
          <form class="flex items-end gap-2" @submit.prevent="sendMessage">
            <Textarea
              v-model="message"
              auto-resize
              class="w-full"
              placeholder="Вопрос"
              rows="1"
              @keydown="handleKeydown"
            />
            <Button
              :disabled="isLoading"
              class="!justify-center"
              severity="primary"
              @click="clearMessage"
            >
              <span class="material-symbols-rounded">close</span>
            </Button>
            <Button
              :disabled="isLoading"
              class="!justify-center"
              severity="help"
              type="submit"
            >
              <span class="material-symbols-rounded">arrow_forward</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  </a-page>
</template>

<script setup>
import { useApiRequest } from "@/composables/useApiRequest.js"
import { computed, onMounted, ref } from "vue"

const { serverData, sendRequest, isLoading, isError, errorMessage } =
  useApiRequest()

const message = ref("")
const lastMessage = ref("")

// Загружаем сохранённые данные при монтировании
onMounted(() => {
  const savedLastMessage = localStorage.getItem("aiHelpLastMessage")
  const savedServerData = localStorage.getItem("aiHelpServerData")
  if (savedLastMessage) {
    lastMessage.value = savedLastMessage
  }
  if (savedServerData) {
    serverData.value = JSON.parse(savedServerData)
  }
})

const clearMessage = () => {
  message.value = ""
}

const editMessage = () => {
  message.value = lastMessage.value
}

const sendMessage = async () => {
  serverData.value = ""
  lastMessage.value = message.value
  await sendRequest("get", `/ai?message=${message.value}`)
  // Сохраняем состояние в localStorage
  localStorage.setItem("aiHelpLastMessage", lastMessage.value)
  localStorage.setItem("aiHelpServerData", JSON.stringify(serverData.value))
}

// Парсим ответ сервера и разбиваем на части
const parsedServerData = computed(() => {
  if (!serverData.value) return []
  const text = serverData.value
  const parts = []
  let currentText = text

  // Парсинг ссылок <id:name>
  const linkRegex = /<(\d+):([^>]+)>/g
  let match
  let lastIndex = 0
  while ((match = linkRegex.exec(currentText)) !== null) {
    const before = currentText.slice(lastIndex, match.index)
    if (before) {
      parts.push(...parseBold(before))
    }
    parts.push({
      type: "link",
      to: `/point/items/${match[1]}`,
      text: match[2],
    })
    lastIndex = linkRegex.lastIndex
  }
  const remaining = currentText.slice(lastIndex)
  if (remaining) {
    parts.push(...parseBold(remaining))
  }

  return parts
})

// Парсинг жирного текста **...**
function parseBold(text) {
  const parts = []
  const boldRegex = /\*\*(.*?)\*\*/g
  let match
  let lastIndex = 0

  while ((match = boldRegex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index)
    if (before) {
      parts.push({ type: "text", text: before })
    }
    parts.push({ type: "bold", text: match[1] })
    lastIndex = boldRegex.lastIndex
  }
  const remaining = text.slice(lastIndex)
  if (remaining) {
    parts.push({ type: "text", text: remaining })
  }

  return parts
}

const handleKeydown = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault() // Предотвращаем стандартное поведение (переход на новую строку)
    sendMessage()
  }
}
</script>

<style scoped>
/* Дополнительные стили для корректного отображения */
strong {
  font-weight: bold;
}
</style>
