<template>
  <div>
    <line-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-options="chartOptions"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler, // Для затенения
} from "chart.js"

// Регистрация компонентов графика
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
)

export default defineComponent({
  components: {
    LineChart: Line,
  },
  data() {
    return {
      // Убедитесь, что chartData определен корректно
      chartData: {
        labels: ["", "", "", "", "", ""], // Должен быть массив
        datasets: [
          {
            data: [0, 5, 15, 10, 12, 8], // Значения графика
            borderColor: "#6C63FF", // Цвет линии
            backgroundColor: "rgba(108, 99, 255, 0.2)", // Цвет заливки
            borderWidth: 2, // Толщина линии
            tension: 0.4, // Сглаживание
            pointRadius: 0, // Убираем точки
            fill: "start", // Включаем затенение
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Убираем легенду
          },
          tooltip: {
            enabled: false, // Отключаем всплывающие подсказки
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Убираем сетку
            },
            ticks: {
              display: false, // Убираем подписи по оси X
            },
          },
          y: {
            grid: {
              drawBorder: false, // Убираем рамку
              color: "rgba(0, 0, 0, 0.1)", // Легкая сетка
            },
            ticks: {
              display: false, // Убираем подписи по оси Y
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: "round", // Закругленные углы
          },
        },
      },
    }
  },
})
</script>
