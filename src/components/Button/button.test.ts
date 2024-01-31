import { expect, test, describe } from 'vitest'
import omButton from './omButton.vue'
import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import omIcon from '../Icon/omIcon.vue'

describe('omButton.vue', () => {
  test('basic button', () => {
    const wrapper = mount(omButton, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper)
    console.log(wrapper.html())
    // class
    expect(wrapper.classes()).toContain('el-button--primary')
    // slot
    // get,find
    expect(wrapper.get('button').text()).toBe('button')
    //events
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled', () => {
    const wrapper = mount(omButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    console.log(wrapper.html())
    // attribute
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(omButton, {
      props: {
        icon: 'key'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('key')
  })

  test('loading', () => {
    const wrapper = mount(omButton, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['omIcon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(omIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
})
