<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'
import omIcon from '../Icon/omIcon.vue'
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<template>
  <button
    class="el-button"
    :class="{
      [`el-button--${type}`]: type,
      [`el-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autofocus="autofocus"
    ref="_ref"
  >
    <om-icon icon="spinner" spin v-if="loading" />
    <om-icon :icon="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style></style>
