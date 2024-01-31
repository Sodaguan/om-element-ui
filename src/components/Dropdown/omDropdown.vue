<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import omTooltip from '../Tooltip/omTooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types'
import RenderVNode from '../../hooks/renderVNode'
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emit = defineEmits<DropdownEmits>()
const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}
const itemClick = (item: MenuOption) => {
  if (item.disabled) {
    return
  }
  emit('select', item)
  if (props.hideAfterClick) {
    console.log(tooltipInstance.value)
    tooltipInstance.value.close()
  }
}

const tooltipInstance = ref<TooltipInstance>() as Ref<TooltipInstance>

const open = () => {
  tooltipInstance.value?.open()
}
const close = () => {
  tooltipInstance.value?.close()
}

defineExpose<DropdownInstance>({
  open,
  close
})
</script>

<template>
  <div>
    <om-tooltip
      :placement="placement"
      :trigger="trigger"
      @visible-change="visibleChange"
      ref="tooltipInstance"
      class="el-dropdown"
    >
      <slot></slot>
      <template #content>
        <ul class="el-dropdown-menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              class="el-dropdown-menu__item"
              :class="{ 'is-disabled': item.disabled }"
              @click="itemClick(item)"
            >
              <RenderVNode :VNode="item.label"></RenderVNode>
              <!-- {{ item.label }} -->
            </li>
            <li v-if="item.divided" class="el-dropdown-menu__item--divided"></li>
          </template>
        </ul>
      </template>
    </om-tooltip>
  </div>
</template>

<style></style>
