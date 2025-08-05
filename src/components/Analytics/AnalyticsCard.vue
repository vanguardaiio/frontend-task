<template>
  <div
    class="flex flex-col items-start p-4 bg-teal-300 shadow rounded-lg transition-transform hover:scale-[1.02] w-full"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-sm text-gray-800">{{ title }}</div>
      <component :is="icon" class="w-5 h-5 text-gray-400" />
    </div>
    <div class="mt-2 text-2xl font-bold text-gray-900">{{ value }}</div>
    <div
      class="mt-1 text-sm font-medium"
      :class="percentChange >= 0 ? 'text-green-600' : 'text-red-600'"
    >
      <span>
        <span v-if="percentChange >= 0">↑</span>
        <span v-else>↓</span>
        {{ Math.abs(percentChange) }}%
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  value: string | number
  percentChange: number
  icon: any
}>()
</script>
