<script setup>
import omButton from '@/components/Button/omButton.vue'
</script>

<template>
  <div>
    <om-button ref="buttonRef">info</om-button>
    <om-button type="primary" icon="key">primary</om-button>
    <om-button type="success">success</om-button>
    <om-button type="danger">danger</om-button>
    <om-button type="warning">warning</om-button>
    <om-button plain>plain</om-button>
    <om-button round>this is a round button</om-button>
    <om-button circle icon="key"></om-button>
    <om-button disabled>disabled</om-button>
  </div>
</template>
