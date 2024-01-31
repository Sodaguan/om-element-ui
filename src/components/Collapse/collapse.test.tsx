import { beforeAll, describe, expect, test, vi } from 'vitest'
import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils'
import omCollapse from './omCollapse.vue'
import omCollapseItem from './omCollapseItem.vue'
import { h } from 'vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>,
  secondtHeader: DOMWrapper<Element>,
  lastHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  lastContent: DOMWrapper<Element>,
  items: DOMWrapper<Element>[],
  lastItem: DOMWrapper<Element>

describe('omCollapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(h(omCollapse, { modelValue: ['a'], onChange }), {
      // h(omCollapse, { modelValue: ['a'], onChange })
      // props: {
      //   modelValue: ['a']
      // },
      slots: {
        default: [
          h(omCollapseItem, { name: 'a', title: 'title a' }, () => 'content a'),
          h(omCollapseItem, { name: 'b', title: 'title b' }, () => 'content b'),
          h(omCollapseItem, { name: 'c', title: 'title c', disabled: true }, () => 'content c')
        ]
      },
      global: {
        stubs: ['omIcon']
      },
      attachTo: document.body
    })
    headers = wrapper.findAll('.el-collapse-item__header')
    contents = wrapper.findAll('.el-collapse-item__wrap')
    firstHeader = headers[0]
    secondtHeader = headers[1]
    lastHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    lastContent = contents[2]

    items = wrapper.findAll('.el-collapse-item')
    lastItem = items[2]
  })
  test('测试基础结构和文字', async () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    expect(firstHeader.text()).toBe('title a')
    expect(firstContent.text()).toBe('content a')
  })
  test('点击标题展开/关闭内容', async () => {
    // 展示
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondtHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', async () => {
    // 行为
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test.skip('disabled的内容', async () => {
    // disabled
    expect(lastItem.classes()).toContain('is-disabled')
    onChange.mockClear()
    await lastHeader.trigger('click')
    expect(onChange).not.toHaveBeenCalled()
    expect(lastContent.isVisible()).toBeTruthy()
  })
})
