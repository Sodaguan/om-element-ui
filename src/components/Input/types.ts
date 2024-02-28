export interface InputProps {
  type?: string
  size?: 'large' | 'small'
  clearable?: boolean
  showPassword?: boolean
  disabled?: boolean
  modelValue?: string
  name?: string
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofoucs?: boolean
  form?: string
}

export interface InputEmits {
  (e: 'focus', value: FocusEvent): void
  (e: 'blue', value: FocusEvent): void
  (e: 'clear'): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
