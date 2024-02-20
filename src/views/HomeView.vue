<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types'
import omButton from '../components/Button/omButton.vue'
import omCollapse from '../components/Collapse/omCollapse.vue'
import omCollapseItem from '../components/Collapse/omCollapseItem.vue'
import omIcon from '../components/Icon/omIcon.vue'
import type { NameType } from '@/components/Collapse/types'
import { createMessage } from '@/components/Message/method'

const buttonRef = ref<ButtonInstance>()
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }

  const instance = createMessage({
    message: 'hello world11111',
    duration: 2000,
    showClose: true,
    type: 'success'
  })

  createMessage({
    message: 'hello world22222',
    duration: 0,
    showClose: true,
    type: 'error'
  })
  createMessage({
    message: 'hello world33333',
    duration: 0,
    showClose: true,
    type: 'warning'
  })

  // setTimeout(() => {
  //   instance.destory()
  // }, 2000)
})
const collapseValue = ref<NameType[]>(['2'])
</script>

<template>
  <div>
    <div>
      <om-button ref="buttonRef">this is a button</om-button>
      <om-button type="primary" icon="key">this is a button</om-button>
      <om-button type="success">this is a button</om-button>
      <om-button type="danger">this is a button</om-button>
      <om-button type="warning">this is a button</om-button>
      <br />
      <om-button plain>this is a plain button</om-button>
      <om-button round>this is a round button</om-button>
      <om-button circle loading></om-button>
      <br />
      <om-button disabled>this is a disabled button</om-button>
      <om-button icon="key">this is a disabled button</om-button>
    </div>
    <div>
      <om-collapse v-model="collapseValue" accordion>
        <om-collapse-item name="1" title="hello1" disabled></om-collapse-item>
        <om-collapse-item name="2" title="hello2">
          <p>nihao</p>
        </om-collapse-item>
        <om-collapse-item name="3">
          <template #title>
            <h1>333333</h1>
          </template>
          <template #default>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
            <p>11111111111111111111111111111</p>
          </template>
        </om-collapse-item>
      </om-collapse>
      <p>{{ collapseValue }}</p>
    </div>
    <div>
      <om-icon :icon="['fas', 'user-secret']" />
      <om-icon icon="fa-solid fa-user-secret" />
      <om-icon icon="user-secret" type="primary" />
      <om-icon icon="key" type="primary" />
      <om-icon icon="spinner" />
      <om-icon icon="user" />
    </div>
  </div>
</template>
