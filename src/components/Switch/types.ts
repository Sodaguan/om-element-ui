export type SwitchValueType = boolean | number | string

export interface SwitchProps {
  name?: string
  disabled?: boolean
  size?: '' | 'large' | 'default' | 'small'
  activeText?: string
  inactiveText?: string
  activeValue?: SwitchValueType
  inactiveValue?: SwitchValueType
  inlinePrompt?: boolean
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: SwitchValueType): void
  (e: 'change', value: SwitchValueType): void
}
