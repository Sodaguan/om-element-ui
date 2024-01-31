<script setup lang="ts">
import omTooltip from '@/components/Tooltip/omTooltip.vue'
import omDropdown from '@/components/Dropdown/omDropdown.vue'
import type { TooltipInstance } from '@/components/Tooltip/types'
import type { Placement, UseFloatingOptions } from '@floating-ui/vue'
import { h, ref } from 'vue'
import type { DropdownInstance, MenuOption } from '@/components/Dropdown/types'

const placement = ref<Placement>('bottom')
const trigger = ref<'click'>('click')
const tooltipInstance = ref<TooltipInstance>()
const open = () => {
  tooltipInstance.value?.open()
}
const close = () => {
  tooltipInstance.value?.close()
}
// const floatingOptions: UseFloatingOptions = {
//   placement: 'top'
//   // strategy: 'fixed'
// }

const menuOptions: MenuOption[] = [
  { label: 'item1', key: 1 },
  { label: 'item2', key: 2 },
  { label: 'item3', key: 3, divided: true },
  { label: 'item4', key: 4, disabled: true },
  { label: h('h1', 'this is h1'), key: 5 }
]
const dropdownInstance = ref<DropdownInstance>()
const dropdownOpen = () => {
  console.log(dropdownInstance.value)
  dropdownInstance.value?.open()
}
const visibleChange = (e: boolean) => {
  console.log(e)
  console.log(dropdownInstance.value)
}
</script>

<template>
  <div>
    <div>
      <om-tooltip content="content aaa" :trigger="trigger" ref="tooltipInstance">
        <!-- 
        :placement="placement"
      :floating-options="floatingOptions"
        transition="fade"
      :open-delay="1000"
      :close-delay="2000" -->
        <span>aaa</span>
      </om-tooltip>
      <br />
      <button @click="open">button1</button>
      <button @click="close">button2</button>
    </div>
    <div>
      <om-dropdown
        ref="dropdownInstance"
        :placement="placement"
        :trigger="trigger"
        :menu-options="menuOptions"
        @visible-change="visibleChange"
      >
        dropdown
      </om-dropdown>
      <br />
      <button @click="dropdownOpen">button1</button>
    </div>
  </div>
</template>
