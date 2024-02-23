import { describe, expect, test } from 'vitest'
import omInput from './omInput.vue'
import { mount } from '@vue/test-utils'

describe('omInput.vue', () => {
  test('basic input', () => {
    const wrapper = mount(omInput, {
      props: {
        type: 'text',
        size: 'large'
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    // class
    expect(wrapper.classes()).toContain('el-input--text')
    expect(wrapper.classes()).toContain('el-input--large')
    // input
    expect(wrapper.find('input')).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slot
    expect(wrapper.find('el-input-group__prepend')).toBeTruthy()
    expect(wrapper.get('.el-input-group__prepend').text()).toBe('prepend')
  })

  test('textarea', () => {
    const wrapper2 = mount(omInput, {
      props: {
        type: 'textarea'
      }
    })
    expect(wrapper2.find('textarea')).toBeTruthy()
  })

  test('modelValue should be updated', async () => {
    const wrapper = mount(omInput, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })
    // init
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // change value
    await input.setValue('change input')
    expect(wrapper.props('modelValue')).toBe('change input')
    expect(input.element.value).toBe('change input')
    // change prop
    await wrapper.setProps({ modelValue: 'change prop' })
    expect(wrapper.props('modelValue')).toBe('change prop')
    expect(input.element.value).toBe('change prop')
  })

  test('clear input', async () => {
    const wrapper = mount(omInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['omIcon']
      }
    })
    expect(wrapper.find('.el-input__clear').exists()).toBeFalsy()
    await wrapper.get('.el-input__clear').trigger('click')
    // expect(wrapper.props('modelValue')).toBe('')
  })
})
