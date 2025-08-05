<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import { ref, watch, defineProps } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  revenueData: Array<{ month: string; revenue: number }>
}>()

const chartData = ref<ChartData<'bar'>>({
  labels: props.revenueData.map(item => item.month),
  datasets: [
    {
      label: 'Revenue',
      data: props.revenueData.map(item => item.revenue),
      backgroundColor: '#3b82f6'
    }
  ]
})

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => `$${ctx.raw}`
      }
    }
  },
  animation: {
    duration: 500
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => `$${value}`
      }
    }
  }
}

watch(
  () => props.revenueData,
  (newData) => {
    chartData.value = {
      labels: newData.map(i => i.month),
      datasets: [{
        label: 'Revenue',
        data: newData.map(i => i.revenue),
        backgroundColor: '#3b82f6'
      }]
    }
  },
  { deep: true }
)
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
