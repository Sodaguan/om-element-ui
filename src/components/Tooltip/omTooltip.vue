<script setup lang="ts">
import { useFloating, offset, arrow, autoUpdate } from '@floating-ui/vue'
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import { reactive, ref, withDefaults, watch, computed } from 'vue'
import tooltipClickOutside from '@/hooks/tooltipClickOutside'
import { debounce } from 'lodash-es'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'right',
  trigger: 'hover',
  manual: false,
  openDelay: 0,
  closeDelay: 0,
  transition: 'fade'
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperContainerNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

const floatingArrow = ref<HTMLElement>()
const floatingOptions = computed(() => {
  return {
    placement: props.placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), arrow({ element: floatingArrow })],
    ...props.floatingOptions
  }
})
const { middlewareData, floatingStyles } = useFloating(triggerNode, popperNode, {
  ...floatingOptions.value,
  whileElementsMounted(...args) {
    const cleanup = autoUpdate(...args, { animationFrame: true })
    // Important! Always return the cleanup function.
    return cleanup
  }
})

tooltipClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    close()
  }
})

const clickEvent = () => {
  if (isOpen.value) {
    close()
  } else if (!isOpen.value) {
    open()
  }
}
let openTimes = 0,
  closeTime = 0
const openDebounce = debounce(() => {
  openTimes++
  isOpen.value = true
  emits('visible-change', true)
  console.log(openTimes)
}, props.openDelay)
const open = () => {
  closeDebounce.cancel()
  openDebounce()
}

const closeDebounce = debounce(() => {
  closeTime++
  isOpen.value = false
  emits('visible-change', false)
  console.log(closeTime)
}, props.closeDelay)
const close = () => {
  openDebounce.cancel()
  closeDebounce()
}

let event: Record<string, any> = reactive({})
let outEvent: Record<string, any> = reactive({})
const registerEvent = () => {
  if (props.trigger === 'click') {
    event['click'] = clickEvent
  } else if (props.trigger === 'hover') {
    event['mouseenter'] = open
    outEvent['mouseleave'] = close
  }
}
if (!props.manual) {
  registerEvent()
}

watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      event = {}
      outEvent = {}
      registerEvent()
    }
  }
)

const side: string = props.placement.split('-')[0]
const staticSide: any = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
}[side]
watch(isOpen, () => {
  setTimeout(() => {
    const arrowLen = floatingArrow.value?.offsetWidth
    if (floatingArrow.value && middlewareData.value.arrow) {
      const { x, y } = middlewareData.value.arrow
      console.log(x, y, arrowLen)
      Object.assign(floatingArrow.value.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        // Ensure the static side gets unset when
        // flipping to other placements' axes.
        right: '',
        bottom: '',
        [staticSide]: `${-!arrowLen / 2}px`
        // background: 'black'
      })
      console.log(floatingArrow.value?.style)
    }
  }, 1)
})

defineExpose<TooltipInstance>({
  open,
  close
})
</script>

<template>
  <div class="el-popover" ref="popperContainerNode" v-on="outEvent">
    <div class="el-popper__trigger" ref="triggerNode" v-on="event">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div class="el-popper" ref="popperNode" v-if="isOpen" :style="floatingStyles">
        <div ref="floatingArrow" class="el-popper__arrow"></div>
        <div class="el-popper__inner">
          <slot name="content"> {{ content }}</slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
