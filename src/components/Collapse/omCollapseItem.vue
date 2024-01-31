<script setup lang="ts">
import { computed, inject } from 'vue'
import { collapseContextKey, type CollapseItemProps } from './types'
import omIcon from '../Icon/omIcon.vue'

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}

const transitionEvent: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<template>
  <div class="el-collapse-item" :class="{ 'is-disabled': disabled, 'is-active': isActive }">
    <div class="el-collapse-item__header" :id="`el-collapse-head-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
      <om-icon
        icon="chevron-right"
        class="el-collapse-item__arrow"
        :class="{ 'is-active': isActive }"
      />
    </div>
    <Transition name="fade" v-on="transitionEvent">
      <div class="el-collapse-item__wrap" v-show="isActive">
        <div class="el-collapse-item__content" :id="`el-collapse-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style></style>
