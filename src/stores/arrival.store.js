import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useApiRequest } from "@/composables/useApiRequest.js"
import { useModalStore } from "@/stores/modal.store.js"

export const useArrivalStore = defineStore("arrival", () => {
  // Состояние
  const arrivalItems = ref(new Map()) // Используем Map для уникальности по ключу
  const comment = ref("") // Комментарий к поступлению

  // Вычисляемые свойства
  const groupedArrivalItems = computed(() => [...arrivalItems.value.values()])
  const itemsCount = computed(() => arrivalItems.value.size)
  const isEmpty = computed(() => itemsCount.value === 0)

  // Формируем данные для отправки на сервер
  const getArrivalData = computed(() => ({
    items: groupedArrivalItems.value.map((item) => ({
      pointItemId: item.id,
      count: item.count,
    })),
    comment: comment.value || undefined,
  }))

  // Методы управления поступлением
  const addItem = (item, count = 1) => {
    console.log(item, count)
    const itemKey = `${item.id}` // Уникальный ключ по id товара
    const existingItem = arrivalItems.value.get(itemKey)

    if (existingItem) {
      existingItem.count += count // Увеличиваем количество, если товар уже есть
    } else {
      arrivalItems.value.set(itemKey, {
        id: item.id,
        name: item.name,
        count: count,
        pointItemId: item.id, // Для отправки на API
      })
    }
  }

  const removeItem = (arrivalItem) => {
    const itemKey = `${arrivalItem.id}`
    const item = arrivalItems.value.get(itemKey)
    if (!item) return

    if (item.count > 1) {
      item.count -= 1 // Уменьшаем количество
      arrivalItems.value.set(itemKey, item)
    } else {
      arrivalItems.value.delete(itemKey) // Удаляем товар, если count станет 0
    }
  }

  const clearArrival = () => {
    arrivalItems.value.clear()
    comment.value = "" // Очищаем комментарий
  }

  // Метод для установки комментария
  const setComment = (newComment) => {
    comment.value = newComment
  }

  // API методы
  const { sendRequest, isError, errorMessage } = useApiRequest()
  const modal = useModalStore()

  const createArrival = async () => {
    if (isEmpty.value) return
    const response = await sendRequest(
      "post",
      "/point/arrivals",
      getArrivalData.value,
    )
    if (response) {
      clearArrival() // Очищаем после успешного создания
    } else if (isError.value) {
      modal.show("Ошибка", errorMessage.value)
    }
    return response // Возвращаем результат для обработки в компоненте
  }

  return {
    arrivalItems,
    groupedArrivalItems,
    itemsCount,
    isEmpty,
    getArrivalData,
    addItem,
    removeItem,
    clearArrival,
    setComment,
    comment,
    createArrival,
  }
})
