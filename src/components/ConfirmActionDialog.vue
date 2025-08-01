<script setup lang="ts">
import { computed } from 'vue'
import AlertDialog from './ui/AlertDialog.vue'
import AlertDialogAction from './ui/AlertDialogAction.vue'
import AlertDialogCancel from './ui/AlertDialogCancel.vue'
import AlertDialogContent from './ui/AlertDialogContent.vue'
import AlertDialogDescription from './ui/AlertDialogDescription.vue'
import AlertDialogFooter from './ui/AlertDialogFooter.vue'
import AlertDialogHeader from './ui/AlertDialogHeader.vue'
import AlertDialogTitle from './ui/AlertDialogTitle.vue'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    description?: string
    loading?: boolean
    cancelVariant?: ButtonVariant
    actionVariant?: ButtonVariant
  }>(),
  {
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently change the data in our servers.',
    cancelVariant: 'outline',
    actionVariant: 'default',
  },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
  cancelAction: []
  continueAction: []
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const buttonVariants = (variant: ButtonVariant) => {
  const variants = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }
  return `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${variants[variant] || variants.default}`
}
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent class="max-w-[400px] gap-5" @escape-key-down.prevent>
      <AlertDialogHeader class="gap-y-2">
        <AlertDialogTitle class="text-2xl">{{ title }}</AlertDialogTitle>
        <AlertDialogDescription class="text-base leading-normal text-muted-foreground">
          {{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="gap-x-3 sm:gap-x-3">
        <AlertDialogCancel :variant="cancelVariant" class="w-full" @click="() => emit('cancelAction')">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction :class="buttonVariants(actionVariant)" class="w-full" @click="() => emit('continueAction')">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
