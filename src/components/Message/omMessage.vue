<script setup lang="ts">
import type { MessageProps } from './types'
import omIcon from '../Icon/omIcon.vue'
import RenderVNode from '@/hooks/renderVNode'
import { computed, onMounted, ref } from 'vue'
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20
})

const visible = ref<boolean>(false)

let timer: any
const startTimer = () => {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
const clearTimer = () => {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTimer()
})

const keyDown = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keyDown)

const destoryComponent = () => {
  props.onDestory()
}

const updateHeight = () => {
  height.value = messageRef.value?.getBoundingClientRect().height!
}

const messageRef = ref<HTMLDivElement>()
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const height = ref(0)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

defineExpose({
  bottomOffset,
  visible
})
</script>

<template>
  <Transition name="el-message-fade" @enter="updateHeight" @afterLeave="destoryComponent">
    <div
      class="el-message"
      :class="{ [`el-message--${type}`]: type, 'is-closable': showClose }"
      :style="cssStyle"
      v-if="visible"
      ref="messageRef"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="el-message__content">
        <slot>
          <!-- {{ message }} -->
          {{ lastOffset }} - {{ topOffset }} - {{ height }} - {{ bottomOffset }} -
          <RenderVNode :VNode="message" v-if="message"></RenderVNode>
        </slot>
      </div>
      <div v-if="showClose" class="el-message__closeBtn">
        <om-icon :icon="['fas', 'xmark']" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>
