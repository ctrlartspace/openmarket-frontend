import { ref, computed, nextTick } from "vue"
import apiService from "@/services/ApiService"

export function useApiRequest() {
  const isLoading = ref(false)
  const isError = ref(false)
  const serverData = ref(null)
  const errorMessage = ref("")
  const validationErrors = ref({})
  const hasValidationErrors = computed(
    () => Object.keys(validationErrors.value).length > 0,
  )
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const sendRequest = async (method, url, payload = null) => {
    try {
      await timeout(1)
      isLoading.value = true
      isError.value = false
      errorMessage.value = ""
      validationErrors.value = {}

      // Вызов API с динамическим методом

      // await timeout(3000)
      const response = await apiService[method](url, payload)
      console.log(response)

      // Успешный ответ
      if (response.data.success) {
        serverData.value = response.data.data
      }
      return response // Возвращаем данные, если нужно дополнительная обработка
    } catch (error) {
      // serverData.value = null
      isError.value = true
      if (error && error.response && error.response.data) {
        errorMessage.value = error.response.data.message
        validationErrors.value = error.response.data.errors // Ошибки валидации
      } else {
        errorMessage.value = error.message || "An error occurred"
      }
      console.error(error) // Логирование ошибки для отладки
    } finally {
      isLoading.value = false
    }
  }

  return {
    serverData,
    errorMessage,
    validationErrors,
    hasValidationErrors,
    isLoading,
    isError,
    sendRequest,
  }
}
