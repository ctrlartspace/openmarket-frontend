<template>
  <div class="card">
    <Chart :data="chartData" :options="chartOptions" type="line" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
})

const chartData = ref()
const chartOptions = ref()

// Функция для обработки данных продаж по дням
const processSalesData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  // Группируем продажи по дням
  const salesByDay = props.sales.reduce((acc, sale) => {
    const date = new Date(sale.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) // Например, "Mar 4"
    const total = sale.items.reduce(
      (sum, item) => sum + item.count * item.sellingPrice,
      0,
    ) // Сумма продажи: count * sellingPrice
    acc[date] = (acc[date] || 0) + total
    return acc
  }, {})

  // Извлекаем метки (даты) и значения (суммы)
  const labels = Object.keys(salesByDay)
  const data = Object.values(salesByDay)

  // Логируем для отладки
  console.log("Sales by day:", salesByDay)
  console.log("Labels:", labels)
  console.log("Data:", data)

  return {
    labels, // Например, ["Mar 4", "Mar 5", ...]
    datasets: [
      {
        label: "Sales by Day",
        data, // Например, [3000, 5000, ...]
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-blue-500"),
        tension: 0.4,
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
  const minValue = Math.min(...data.filter((v) => v > 0)) || 0 // Минимальное ненулевое значение
  const maxValue = Math.max(...data) || 100 // Максимальное значение, минимум 100 если все 0
  const range = maxValue - minValue || 100 // Диапазон, минимум 100 если все 0
  const padding = range * 0.1 || 10 // Отступ

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
          color: textColorSecondary,
          maxTicksLimit: 3,
        },
        grid: {
          display: false,
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
          display: true,
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

// Инициализация графика
onMounted(() => {
  chartData.value = processSalesData()
  chartOptions.value = setChartOptions()
})

// Обновление при изменении props.sales
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
