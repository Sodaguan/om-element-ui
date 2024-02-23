<script setup lang="ts">
import { computed, type Ref, ref, onMounted, watch } from 'vue'
import type { SwitchEmits, SwitchProps, SwitchValueType } from './types'

const props = withDefaults(defineProps<SwitchProps>(), {
  activeText: '~ ~',
  inactiveText: 'T T',
  activeValue: 1,
  inactiveValue: 0,
  inlinePrompt: true
})
const modelValue = defineModel<SwitchValueType>()

const inputRef = ref() as Ref<HTMLInputElement>

const emits = defineEmits<SwitchEmits>()

const checked = computed(() => modelValue.value === props.activeValue)

onMounted(() => {
  inputRef.value.checked = checked.value
  modelValue.value = checked.value ? props.activeValue : props.inactiveValue
})

watch(checked, (val) => {
  inputRef.value.checked = val
})

const toggleSwitch = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  modelValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}
</script>

<template>
  <div
    class="el-switch"
    :class="{
      'is-checked': modelValue,
      'is-disabled': disabled,
      [`el-switch--${size}`]: size
    }"
    @click="toggleSwitch"
  >
    <input
      type="checkbox"
      class="el-switch__input"
      ref="inputRef"
      :name="name"
      :disabled="disabled"
      v-model="modelValue"
    />
    <span
      v-if="inactiveText && !inlinePrompt"
      class="el-switch__label el-switch__label--left"
      :class="{ 'is-active': !modelValue }"
    >
      {{ inactiveText }}
    </span>
    <span class="el-switch__core">
      <div class="el-switch__inner" v-if="inlinePrompt">
        <span class="is-text">{{ checked ? activeText : inactiveText }}</span>
      </div>
      <div class="el-switch__action"></div>
    </span>
    <span
      v-if="activeText && !inlinePrompt"
      class="el-switch__label el-switch__label--right"
      :class="{ 'is-active': modelValue }"
    >
      {{ activeText }}
    </span>

    {{ checked }}
    {{ modelValue }}
  </div>
</template>
