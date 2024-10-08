import { ref, computed } from "vue"
import apiService from "@/services/ApiService"

export function useApiRequest() {
  const serverData = ref(null)
  const errorMessage = ref("")
  const validationErrors = ref({})
  const hasValidationErrors = computed(
    () => Object.keys(validationErrors.value).length > 0,
  )

  const sendRequest = async (method, url, payload = null) => {
    try {
      errorMessage.value = ""
      validationErrors.value = {}

      // Вызов API с динамическим методом
      const response = await apiService[method](url, payload)

      // Успешный ответ
      if (response.data.success) {
        serverData.value = response.data.data
      }
      return response // Возвращаем данные, если нужно дополнительная обработка
    } catch (error) {
      if (error && error.response && error.response.data) {
        errorMessage.value = error.response.data.message
        validationErrors.value = error.response.data.errors // Ошибки валидации
      } else {
        errorMessage.value = error.message || "An error occurred"
      }
      console.error(error) // Логирование ошибки для отладки
    }
  }

  return {
    serverData,
    errorMessage,
    validationErrors,
    hasValidationErrors,
    sendRequest,
  }
}
