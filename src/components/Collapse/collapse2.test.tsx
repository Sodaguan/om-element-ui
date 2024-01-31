import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import omCollapse from './omCollapse.vue'
import omCollapseItem from './omCollapseItem.vue'
import { h } from 'vue'

describe('omCollapse.vue', () => {
  test('basic collapse', async () => {
    const onChange = vi.fn()
    const wrapper = mount(h(omCollapse, { modelValue: ['a'], onChange }), {
      // h(omCollapse, { modelValue: ['a'], onChange })
      props: {
        modelValue: ['a']
      },
      slots: {
        default: [
          h(omCollapseItem, { name: 'a', title: 'title a' }, () => 'content a'),
          h(omCollapseItem, { name: 'b', title: 'title b' }, () => 'content b'),
          h(omCollapseItem, { name: 'c', title: 'title c', disabled: true }, () => 'content c')
        ]
        // default: [
        //   '<om-collapse-item name="a" title="title a">content a</om-collapse-item>',
        //   '<om-collapse-item name="b" title="title b">content b</om-collapse-item>',
        //   '<om-collapse-item name="c" title="title c">content c</om-collapse-item>'
        // ]
        // default: (
        //   <>
        //     <om-collapse-item name="a" title="title a">
        //       content a
        //     </om-collapse-item>
        //     <om-collapse-item name="b" title="title b">
        //       content b
        //     </om-collapse-item>
        //     <om-collapse-item name="c" title="title c">
        //       content c
        //     </om-collapse-item>
        //   </>
        // )
      },
      global: {
        stubs: ['omIcon', 'omCollapseItem']
      },
      attachTo: document.body
    })
    console.log(wrapper.html())
    // 长度
    const items = wrapper.findAll('.el-collapse-item')
    const headers = wrapper.findAll('.el-collapse-item__header')
    const contents = wrapper.findAll('.el-collapse-item__wrap')
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    const firstHeader = headers[0]
    const secondtHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')
    const firstContent = contents[0]
    expect(firstContent.text()).toBe('content a')
    // 展示
    expect(firstContent.isVisible()).toBeTruthy()
    const secondContent = contents[1]
    expect(secondContent.isVisible()).toBeFalsy()
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondtHeader.trigger('click')
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
    expect(secondContent.isVisible()).toBeTruthy()
    // disabled
    const lastItem = items[2]
    console.log(lastItem.html())
    expect(lastItem.classes()).toContain('is-disabled')
  })

  // test('basic collapse2', async () => {
  //   const onChange = vi.fn()
  //   const wrapper = mount(
  //     () => (
  //       <om-collapse v-model={['1']} onChange={onChange}>
  //         <om-collapse-item name="1" title="hello1">
  //           1
  //         </om-collapse-item>
  //         <om-collapse-item name="2" title="hello2">
  //           2
  //         </om-collapse-item>
  //       </om-collapse>
  //     ),
  //     {
  //       global: {
  //         stubs: ['omIcon']
  //       }
  //     }
  //   )
  //   console.log('++++' + wrapper)
  // })
})
