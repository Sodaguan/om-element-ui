<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import omSelect from './omSelect.vue'
import type { CustomRemoteFunc } from './types'

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]

const remoteMethod: CustomRemoteFunc = (query: string) => {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase())
          })
          .map((label) => {
            return { label, value: label }
          })
        resolve(options)
      }, 1000)
    } else {
      resolve([])
    }
  })
}

const fetchMethod: CustomRemoteFunc = (query: string) => {
  if (!query) return Promise.resolve([])
  return fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item: any) => ({ label: item.name, value: item.node_id }))
    })
}
</script>

<template>
  <om-select filterable remote :remote-method="fetchMethod"></om-select>
</template>
