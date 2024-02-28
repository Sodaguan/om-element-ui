import type { VNode } from 'vue'

export interface SelectProps {
  disabled?: boolean
  size?: '' | 'large' | 'default' | 'small'
  clearable?: boolean
  placeholder?: string
  options?: SelectOption[]
  renderLabel?: RenderLabelFunc
  filterable?: boolean
  filterMethod?: CustomFilterFunc
  remote?: boolean
  remoteMethod?: CustomRemoteFunc
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectState {
  inputValue?: string | ''
  selectOption?: SelectOption | null
  mouseHover?: boolean
  loading?: boolean
  highLightIndex: number
}

export interface SelectEmits {
  (e: 'change', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomRemoteFunc = (value: string) => Promise<SelectOption[]>
