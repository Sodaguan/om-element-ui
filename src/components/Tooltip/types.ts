import type { Placement, UseFloatingOptions } from '@floating-ui/vue'

export interface TooltipProps {
  content?: string
  trigger?: 'click' | 'hover'
  manual?: boolean
  placement?: Placement
  floatingOptions?: UseFloatingOptions
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  open: () => void
  close: () => void
}
