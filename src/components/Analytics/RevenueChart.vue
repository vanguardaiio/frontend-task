<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps<{
  data: Array<{ month: string; revenue: number }>
}>()

const chartData = {
  labels: props.data.map(item => item.month),
  datasets: [
    {
      label: 'Revenue',
      data: props.data.map(item => item.revenue),
      backgroundColor: '#3b82f6'
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index' as const, intersect: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (tickValue: string | number) => {
          if (typeof tickValue === 'number') {
            return `$${tickValue.toLocaleString()}`;
          }
          return `$${tickValue}`;
        }
      }
    }
  }
}
</script>
