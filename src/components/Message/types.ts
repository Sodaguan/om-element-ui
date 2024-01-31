import type { ComponentInternalInstance, VNode } from 'vue'

export interface MessageProps {
  type?: 'success' | 'warning' | 'info' | 'error'
  message?: string | VNode
  duration?: number
  showClose?: boolean
  onDestory: () => void
  offset?: number
  id: string
}

export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id'>

export interface MessageEmits {
  close: () => void
}

export interface MessageInstance {
  id: string
  vNode?: VNode
  props: MessageProps
  vm: ComponentInternalInstance
}
