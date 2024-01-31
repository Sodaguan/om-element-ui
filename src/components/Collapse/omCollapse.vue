<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { collapseContextKey } from './types'
import type { NameType, CollapseProps, CollapseEmits } from './types'

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
const handleItemClick = (name: NameType) => {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = activeNames.value[0] === name ? [] : [name]
  } else {
    const index = _activeNames.indexOf(name)
    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(name)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}

watch(
  () => props.modelValue,
  (newVal) => {
    activeNames.value = newVal
  }
)

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div class="el-collapse">
    <slot></slot>
  </div>
</template>

<style></style>
