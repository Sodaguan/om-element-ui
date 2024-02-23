<script setup lang="ts">
import type { InputEmits, InputProps } from './types'
import omIcon from '../Icon/omIcon.vue'
import { computed, ref, useAttrs, type Ref } from 'vue'

defineOptions({
  inheritAttrs: false
})
const attrs = useAttrs()

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})

const emits = defineEmits<InputEmits>()

const inputRef = ref() as Ref<HTMLInputElement>
const inputValue = defineModel<string>()

const isFocus = ref(false)
const showClear = computed(
  () => props.clearable && !!inputValue.value && !props.disabled && isFocus.value
)

const handleInput = () => {
  emits('input', inputValue.value as string)
}

const handleChange = () => {
  emits('change', inputValue.value as string)
}

const handleFoucs = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blue', e)
}

const clear = () => {
  inputValue.value = ''
}

const passwordVisible = ref(false)
const showPasswordIcon = computed(() => props.showPassword && !props.disabled && !!inputValue.value)
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const keepFoucs = () => {
  inputRef.value.focus()
}

defineExpose({
  ref: inputRef
})
</script>

<template>
  <div
    class="el-input"
    :class="{
      [`el-input--${type}`]: type,
      [`el-input--${size}`]: size,
      'is-disabled': disabled,
      'el-input__prefix': $slots.prefix,
      'el-input__suffix': $slots.suffix,
      'el-input-group': $slots.prepend || $slots.append
    }"
  >
    <div
      class="el-input__wrapper"
      :class="{
        'is-focus': isFocus
      }"
    >
      <template v-if="type !== 'textarea'">
        <!-- prepend -->
        <div v-if="$slots.prepend" class="el-input-group__prepend">
          <slot name="prepend"></slot>
        </div>
        <!-- prefix -->
        <span v-if="$slots.prefix" class="el-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :placeholder="placeholder"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :readonly="readonly"
          :autofocus="autofoucs"
          :form="form"
          class="el-input__inner"
          v-model="inputValue"
          ref="inputRef"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFoucs"
          @blur="handleBlur"
          v-bind="attrs"
        />
        <!-- suffix -->
        <span
          v-if="$slots.suffix || showClear || showPasswordIcon"
          class="el-input__suffix"
          @click="keepFoucs"
        >
          <slot name="suffix"></slot>
          <span class="el-input__suffix-inner">
            <om-icon
              icon="circle-xmark"
              class="el-input__icon el-input__clear"
              v-show="showClear"
              @click="clear"
              @mousedown.prevent
            />
            <om-icon
              icon="eye"
              class="el-input__icon el-input__password"
              v-show="showPasswordIcon && !passwordVisible"
              @click="togglePasswordVisible"
            />
            <om-icon
              icon="eye-slash"
              class="el-input__icon el-input__password"
              v-show="showPasswordIcon && passwordVisible"
              @click="togglePasswordVisible"
            />
          </span>
        </span>
        <!-- append -->
        <div v-if="$slots.append" class="el-input-group__append">
          <slot name="append"></slot>
        </div>
      </template>
      <template v-else>
        <textarea
          :placeholder="placeholder"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :readonly="readonly"
          :autofocus="autofoucs"
          :form="form"
          class="el-textarea__inner"
          ref="inputRef"
          v-bind="attrs"
          v-model="inputValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFoucs"
          @blur="handleBlur"
        ></textarea>
      </template>
    </div>
  </div>
</template>
