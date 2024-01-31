<script setup lang="ts">
import type { MessageProps } from './types'
import omIcon from '../Icon/omIcon.vue'
import RenderVNode from '@/hooks/renderVNode'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { getLastBottomOffset } from './method'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20
})

const visible = ref<boolean>(false)

const startTimer = () => {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(async () => {
  visible.value = true
  startTimer()
  await nextTick()
  height.value = messageRef.value?.getBoundingClientRect().height!
})

watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestory()
  }
})
const messageRef = ref<HTMLDivElement>()
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const height = ref(0)
const bottomOffset = computed(() => height.value + topOffset.value)

defineExpose({
  bottomOffset
})
</script>

<template>
  <div
    class="el-message"
    :class="{ [`el-message--${type}`]: type, 'is-closable': showClose }"
    :style="{ top: topOffset + 'px' }"
    v-if="visible"
    ref="messageRef"
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
</template>
