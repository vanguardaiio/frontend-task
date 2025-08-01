<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  AlertDialogRoot,
  type AlertDialogRootEmits,
  type AlertDialogRootProps,
} from 'reka-ui'

interface Props extends /* @vue-ignore */ AlertDialogRootProps {
  open?: boolean
}

interface Emits extends /* @vue-ignore */ AlertDialogRootEmits {
  'update:open': [value: boolean]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const open = useVModel(props, 'open', emit, {
  defaultValue: false,
  passive: (props.open === undefined) as false,
})
</script>

<template>
  <AlertDialogRoot v-model:open="open">
    <slot />
  </AlertDialogRoot>
</template>
