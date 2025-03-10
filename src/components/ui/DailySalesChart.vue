<template>
  <div class="mb-2 rounded-xl bg-white p-4 dark:bg-neutral-900">
    <h1 class="mb-2 font-medium">{{ declineSales }}</h1>
    <div class="rounded-xl bg-gray-50 p-4 dark:bg-neutral-950">
      <Chart
        v-if="shouldShowChart"
        :data="chartData"
        :options="chartOptions"
        class="h-20"
        type="line"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
})

const chartData = ref()
const chartOptions = ref()

// Вычисляемое свойство для проверки, нужно ли отображать график
const shouldShowChart = computed(() => {
  if (!props.sales.length) return false
  const saleDates = props.sales.map((sale) =>
    new Date(sale.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  )
  const uniqueDates = [...new Set(saleDates)] // Уникальные даты
  return uniqueDates.length > 1 // Показываем, если более 1 дня
})

// Обработка данных: сумма продаж по дням
const processSalesData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  // Если данных нет или меньше 2 дней, возвращаем пустой объект (график скрыт через v-if)
  if (!props.sales.length || !shouldShowChart.value) {
    return {
      labels: [],
      datasets: [
        {
          label: "Итого",
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--p-blue-500"),
          tension: 0.4,
          pointStyle: "circle",
          pointRadius: 4,
          pointBackgroundColor: documentStyle.getPropertyValue("--p-blue-500"),
        },
      ],
    }
  }

  // Группируем продажи по дням
  const salesByDay = props.sales.reduce((acc, sale) => {
    const date = new Date(sale.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) // Например, "Mar 4"
    const total = sale.items.reduce(
      (sum, item) => sum + item.count * item.sellingPrice,
      0,
    ) // Сумма продажи
    acc[date] = (acc[date] || 0) + total
    return acc
  }, {})

  // Извлекаем метки и данные
  const labels = Object.keys(salesByDay).sort(
    (a, b) => new Date(a) - new Date(b),
  ) // Сортируем по возрастанию даты
  const data = labels.map((label) => salesByDay[label])

  console.log("Daily totals:", salesByDay)
  console.log("Sorted labels:", labels) // Для проверки сортировки

  return {
    labels, // ["Mar 4", "Mar 5", ...] слева направо по возрастанию
    datasets: [
      {
        label: "Итого",
        data, // [3000, 5000, ...]
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-blue-500"),
        tension: 0.4,
        pointStyle: "circle", // Сплошные точки в виде кругов
        pointRadius: 4, // Увеличиваем радиус точек
        pointBackgroundColor: documentStyle.getPropertyValue("--p-blue-500"), // Заполняем цветом
      },
    ],
  }
}

// Настройка опций графика
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color",
  )
  const data = chartData.value?.datasets[0].data || []
  const minValue = Math.min(...data.filter((v) => v > 0)) || 0
  const maxValue = Math.max(...data) || 100 // Минимум 100, если все 0
  const range = maxValue - minValue || 100
  const padding = range * 0.1 || 10

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const label = tooltipItems[0].label || ""
            const date = new Date(label) // Преобразуем метку обратно в дату
            return date
              .toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
              })
              .replace(/\./g, "") // "10 февр" без точек
          },
          label: (context) => {
            const value = context.raw || 0
            // Форматируем число с пробелами как разделителями тысяч
            const formattedValue = value.toLocaleString("ru-RU")
            return `Итого: ${formattedValue} тенге` // "Итого: 21 492 000 руб."
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
          color: textColorSecondary,
          maxTicksLimit: 7, // До 7 дней
        },
        grid: {
          display: false, // Сетка по X отключена
        },
        border: {
          display: false, // Убираем линию оси X
        },
      },
      y: {
        min: minValue - padding,
        max: maxValue + padding,
        ticks: {
          display: false,
          color: textColorSecondary,
          maxTicksLimit: 3,
        },
        grid: {
          display: false, // Сетка по Y отключена
        },
        border: {
          display: false, // Убираем линию оси Y
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  }
}

// Функция для склонения слова "продажа"
const declineSales = computed(() => {
  const count = props.sales ? props.sales.length : 0
  // Получаем последние две цифры числа
  const lastTwoDigits = count % 100
  // Получаем последнюю цифру числа
  const lastDigit = count % 10

  // Проверяем исключения для чисел 11–19
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "продаж"
  }

  // Склонение в зависимости от последней цифры
  if (lastDigit === 1) {
    return `${count} продажа`
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} продажи`
  } else {
    return `${count} продаж`
  }
})

onMounted(() => {
  chartData.value = processSalesData()
  chartOptions.value = setChartOptions()
})

watch(
  () => props.sales,
  () => {
    chartData.value = processSalesData()
    chartOptions.value = setChartOptions()
  },
  { deep: true },
)
</script>

<style scoped>
.card {
  padding: 0;
  margin: 0;
}
</style>
