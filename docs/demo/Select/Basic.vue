<script setup>
import omSelect from '@/components/Select/omSelect.vue'
import { ref, h } from 'vue'
const selectValue = ref()
const options = [
  { label: 'aaa', value: '1' },
  { label: 'bbb', value: '2' },
  { label: 'ccc', value: '3', disabled: true }
]

const customRender = (option) => {
  return h('div', { className: 'xyz' }, [h('b', option.label), h('span', option.value)])
}
</script>

<template>
  <om-select
    v-model="selectValue"
    placeholder="基础选择器"
    :options="options"
    :render-label="customRender"
    filterable
  ></om-select>
</template>

<style>
.xyz {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
