export type ButtonType = 'primary' | 'success' | 'warning' | 'info' | 'danger'
export type ButtonSize = 'large' | 'small' 

export interface ButtonProps {
    type?: ButtonType,
    size?: ButtonSize,
    plain?: boolean,
    round?: boolean,
    circle?: boolean,
    disabled?: boolean,
    nativeType?: NativeType,
    autofocus?: boolean
    icon?: string,
    loading?: boolean
}

export type NativeType = 'button' | 'reset' | 'submit'

export interface ButtonInstance {
    ref: HTMLButtonElement | null
}