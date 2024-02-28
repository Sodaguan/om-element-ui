<script setup lang="ts">
import { computed, reactive, ref, type Ref, watch } from 'vue'
import omTooltip from '@/components/Tooltip/omTooltip.vue'
import omIcon from '../Icon/omIcon.vue'
import type { SelectEmits, SelectOption, SelectProps, SelectState } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import RenderVNode from '@/hooks/renderVNode'
import { debounce, isFunction } from 'lodash-es'

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'placeholder',
  options: () => [],
  filterable: false,
  remote: false
})
const emits = defineEmits<SelectEmits>()

const tooltipInstance = ref() as Ref<TooltipInstance>
const isDropdownShow = ref(false)
const tooltipOutsideClick = () => {
  isFocused.value = false
  controlDropdown(false)
}
const controlDropdown = (value: boolean) => {
  if (value) {
    if (props.filterable) {
      states.inputValue = ''
      filterOptions.value = props.options
    }
    tooltipInstance.value.open()
  } else {
    if (props.filterable) {
      states.inputValue = states.selectOption?.label
    }
    tooltipInstance.value.close()
  }
  isDropdownShow.value = value
  states.highLightIndex = 0
  emits('visible-change', value)
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
  inputRefFocus()
}

const modelValue = defineModel<string>()
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value)
  return option ? option : null
}
let initialOption = findOption(modelValue.value!)
const states = reactive<SelectState>({
  inputValue: initialOption ? initialOption.label : '',
  selectOption: initialOption,
  mouseHover: false,
  loading: false,
  highLightIndex: 0
})
watch(modelValue, (newVal) => {
  initialOption = findOption(newVal!)
  states.inputValue = initialOption ? initialOption.label : ''
  states.selectOption = initialOption
})

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  modelValue.value = e.value
  states.inputValue = e.label
  states.selectOption = e
  emits('change', e.value)
  controlDropdown(false)
  inputRefFocus()
}

const inputRef = ref()
const isFocused = ref(false)
const inputRefFocus = () => {
  inputRef.value.focus()
  isFocused.value = true
}

const showClearIcon = computed(() => {
  if (props.disabled) return false
  return props.clearable && states.mouseHover && !!states.inputValue && !!modelValue.value
})

const onClear = () => {
  states.inputValue = ''
  states.selectOption = null
  modelValue.value = ''
  emits('clear')
  emits('change', '')
  filterOptions.value = props.options
}

const filterOptions = ref(props.options)
watch(
  () => props.options,
  (newVal) => {
    filterOptions.value = newVal
  }
)
const generateFilterOptions = async (searchValue: string | '') => {
  if (!props.filterable) return
  if (!searchValue) {
    filterOptions.value = props.options
  } else if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filterOptions.value = await props.remoteMethod(searchValue)
    } catch (error) {
      console.log(error)
      filterOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filterOptions.value = props.options.filter((option) =>
      option.label.includes(states.inputValue!)
    )
  }
  console.log(props.options)
}
const onFilter = () => {
  generateFilterOptions(states.inputValue!)
}
const timeout = computed(() => (props.remote ? 300 : 0))
const debounceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)

const filterPlaceholder = computed(() => {
  return props.filterable && states.selectOption && isDropdownShow.value
    ? states.selectOption.label
    : props.placeholder
})

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true)
      }
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      if (isDropdownShow.value && filterOptions.value.length > 0) {
        states.highLightIndex === 0
          ? (states.highLightIndex = filterOptions.value.length - 1)
          : states.highLightIndex--
      }
      break
    case 'ArrowDown':
      if (isDropdownShow.value && filterOptions.value.length > 0) {
        states.highLightIndex === filterOptions.value.length - 1
          ? (states.highLightIndex = 0)
          : states.highLightIndex++
      }
      break
    default:
      break
  }
}
</script>

<template>
  <div
    class="el-select"
    :class="{
      [`el-select--${size}`]: size
    }"
  >
    <om-tooltip
      placement="bottom-start"
      trigger="click"
      ref="tooltipInstance"
      manual
      transition="outIn"
      @click-outside="tooltipOutsideClick"
    >
      <div
        class="el-select__wrapper"
        :class="{
          'is-hovering': states.mouseHover,
          'is-focused': isFocused,
          'is-disabled': disabled,
          'is-filterable': filterable
        }"
        @mouseenter="states.mouseHover = true"
        @mouseleave="states.mouseHover = false"
        @click.stop="toggleDropdown"
        @keydown="handleKeydown"
      >
        <div class="el-select__selection">
          <div
            class="el-select__selected-item el-select__input-wrapper"
            :class="{ 'is-hidden': !filterable }"
          >
            <input
              type="text"
              class="el-select__input"
              v-model="states.inputValue"
              :readonly="!filterable"
              ref="inputRef"
              @input="debounceOnFilter"
            />
            <span class="el-select__input-calculator" v-if="filterable">
              {{ states.inputValue }}
            </span>
          </div>
          <div
            class="el-select__selected-item el-select__placeholder"
            :class="{ 'is-transparent': isDropdownShow }"
            v-if="!states.inputValue"
          >
            {{ filterPlaceholder }}
          </div>
        </div>
        <div class="el-select__suffix">
          <om-icon
            icon="circle-xmark"
            class="el-select__caret el-select__icon"
            v-if="showClearIcon"
            @click.stop="onClear"
            @mousedown.prevent
          />
          <om-icon
            icon="angle-down"
            class="el-select__caret el-select__icon"
            :class="{ 'is-reverse': isDropdownShow }"
            v-else
          />
        </div>
      </div>
      <!-- <om-input
        class="el-select__input-wrapper"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="states.inputValue"
        readonly
        ref="inputRef"
      >
        <template #suffix>
          <om-icon
            icon="circle-xmark"
            class="el-select__suffix el-select__caret"
            v-if="showClearIcon"
          />
          <om-icon
            icon="angle-down"
            class="el-select__suffix el-select__caret"
            :class="{ 'is-reverse': isDropdownShow }"
            v-else
          />
        </template>
      </om-input> -->
      <template #content>
        <div class="el-select-dropdown__empty" v-if="states.loading">Loading</div>
        <div class="el-select-dropdown__empty" v-else-if="!filterOptions.length">No data</div>
        <div class="el-select-dropdown" v-else>
          <div class="el-select-dropdown__wrap">
            <ul class="el-select-dropdown__list">
              <li
                v-for="(item, i) in filterOptions"
                :key="item.value"
                :disabled="item.disabled"
                class="el-select-dropdown__item"
                :class="{
                  'is-disabled': item.disabled,
                  'is-selected': item.value === states.selectOption?.value,
                  'is-hovering': states.highLightIndex === i
                }"
                @click="itemSelect(item)"
                @mouseenter="states.highLightIndex = i"
              >
                <!-- {{ item.label }} -->
                <RenderVNode :VNode="renderLabel ? renderLabel(item) : item.label"></RenderVNode>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </om-tooltip>
  </div>
</template>

<style>
.xyz {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
