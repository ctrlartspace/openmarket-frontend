<template>
  <div>
    <Chart
      v-if="shouldShowChart"
      :data="chartData"
      :options="chartOptions"
      class="mt-2"
      type="bar"
    />
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
  const saleHours = props.sales.map((sale) =>
    new Date(sale.createdAt).getHours(),
  )
  const startHour = Math.min(...saleHours)
  const endHour = Math.max(...saleHours)
  return endHour - startHour > 0
})

// Обработка данных: количество продаж по часам
const processSalesData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  // Если данных нет или разница часов <= 0, возвращаем пустой объект (график скрыт через v-if)
  if (!props.sales.length || !shouldShowChart.value) {
    return {
      labels: [],
      datasets: [
        {
          label: "Количество продаж",
          data: [],
          backgroundColor: documentStyle.getPropertyValue("--p-blue-500"),
          borderWidth: 0,
          barThickness: 12,
        },
      ],
    }
  }

  // Находим первый и последний час продаж
  const saleHours = props.sales.map((sale) =>
    new Date(sale.createdAt).getHours(),
  )
  const startHour = Math.min(...saleHours) // Час первой продажи
  const endHour = Math.max(...saleHours) // Час последней продажи
  const hourRange = endHour - startHour + 1 // Количество часов в диапазоне

  // Инициализируем массив для часов с данными
  const salesByHour = Array(hourRange).fill(0)

  // Дата начала смены для фильтрации
  const shiftDate = new Date(props.sales[0].createdAt)
  shiftDate.setHours(0, 0, 0, 0)

  // Группируем продажи по часам (считаем количество единиц)
  props.sales.forEach((sale) => {
    const saleDate = new Date(sale.createdAt)
    const isShiftDay = saleDate.toDateString() === shiftDate.toDateString()

    if (isShiftDay) {
      const hour = saleDate.getHours()
      if (hour >= startHour && hour <= endHour) {
        const index = hour - startHour // Смещение относительно первого часа
        const count = sale.items.reduce((sum, item) => sum + item.count, 0)
        salesByHour[index] += count
      }
    }
  })

  // Метки: часы в формате "hh:mm" от первого до последнего
  const labels = Array.from({ length: hourRange }, (_, i) => {
    const hour = startHour + i
    return `${hour.toString().padStart(2, "0")}:00`
  })

  console.log("Start hour:", startHour)
  console.log("End hour:", endHour)
  console.log("Hourly count:", salesByHour)
  console.log("Labels:", labels)

  return {
    labels, // Например, ["08:00", "09:00", ..., "18:00"]
    datasets: [
      {
        label: "Количество продаж",
        data: salesByHour, // Количество единиц по часам
        backgroundColor: documentStyle.getPropertyValue("--p-blue-500"),
        borderWidth: 0,
        barThickness: 12,
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
  const minValue = 0 // Всегда начинаем с 0
  const maxValue = data.length ? Math.max(...data) : 10 // Максимум из данных или 10

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
          display: true, // Метки часов видны
          color: textColorSecondary,
          maxTicksLimit: 6,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false, // Сетка по X отключена
        },
        border: {
          display: false, // Убираем линию оси X
        },
      },
      y: {
        min: minValue,
        max: maxValue,
        ticks: {
          display: false, // Метки по Y скрыты
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
