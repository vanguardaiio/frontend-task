<script setup lang="ts">
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard.vue';
import ProductManagement from './components/ProductManagement.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto p-6">
      <!-- <UserManagement /> -->
      <ProductManagement />
      <AnalyticsDashboard />
    </div>
  </div>
</template>
