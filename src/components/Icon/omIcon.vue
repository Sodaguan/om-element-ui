<script setup lang="ts">
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types'
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<IconProps>()
const filterProps = omit(props, ['type', 'color'])

const customStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i class="el-icon" :class="{ [`el-icon--${type}`]: type }" :style="customStyle" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style></style>
