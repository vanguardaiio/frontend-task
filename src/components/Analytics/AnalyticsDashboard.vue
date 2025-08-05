<template>
  <div class="p-4">
    <div v-if="loading" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="n in 4" :key="n" class="bg-gray-200 h-24 animate-pulse rounded"></div>
      </div>
      <div class="h-64 bg-gray-200 animate-pulse rounded"></div>
    </div>

    <div v-else-if="!data" class="text-center text-gray-500">No data available</div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AnalyticsCard icon="users" title="Total Users" :value="data.totalUsers" :percentChange="4.5" />
        <AnalyticsCard icon="box" title="Total Products" :value="data.totalProducts" :percentChange="-2.3" />
        <AnalyticsCard icon="dollar-sign" title="Total Revenue" :value="formatCurrency(data.totalRevenue)" :percentChange="3.1" />
        <AnalyticsCard icon="activity" title="Active Sessions" :value="data.activeSessions" :percentChange="1.2" />
      </div>

      <BarChart :revenueData="data.revenueByMonth" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import AnalyticsCard from './AnalyticsCard.vue'
import { formatCurrency } from '../../lib/format-currency.util'
import type { AnalyticsData } from '../types/AnalyticsData.type'
import BarChart from './BarChart.vue'
import { mockAnalytics } from '../mock-data/mock-analytics'

const data = ref<AnalyticsData | null>(null)
const loading = ref(true)

const fetchData = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  data.value = mockAnalytics
  loading.value = false
}

onMounted(() => {
  fetchData()
  setInterval(fetchData, 5000)
})
</script>
