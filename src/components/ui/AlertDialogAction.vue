<script setup lang="ts">
import { AlertDialogAction } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <AlertDialogAction :class="cn(props.class)">
    <slot />
  </AlertDialogAction>
</template>
