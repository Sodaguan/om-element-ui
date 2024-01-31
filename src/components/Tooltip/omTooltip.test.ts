import { describe, beforeAll, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, mount, DOMWrapper } from '@vue/test-utils'
import { h } from 'vue'
import omTooltip from './omTooltip.vue'

let wrapper: VueWrapper,
  triggerDOM: DOMWrapper<HTMLElement>,
  tooltipDOM: DOMWrapper<HTMLElement>,
  outsideDOM: HTMLDivElement
const onVisibleChange = vi.fn()
// const clickEvent = new Event('click')

// vi.mock('@floating-ui/vue')
// 注意：v-if生成的dom每次判断时需要重新获取
describe('omTooltip.vue', () => {
  beforeAll(() => {
    wrapper = mount(h(omTooltip, { onVisibleChange }), {
      props: {
        content: 'tootip content',
        trigger: 'click',
        manual: false
      },
      slots: {
        default: ['<span id="trigger">aaa</span>']
      },
      attachTo: document.body
    })
    triggerDOM = wrapper.find('#trigger')

    outsideDOM = document.createElement('div')
    outsideDOM.innerHTML = 'outside div'
    outsideDOM.addEventListener('click', (e) => {
      console.log(e.target)
      console.log('outside click')
    })
    const dom = document.querySelector('.el-popover') as HTMLElement
    console.log('++++++++++' + dom.outerHTML)
    dom.parentNode!.appendChild(outsideDOM)
  })
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.clearAllTimers()
  })
  test('静态测试', async () => {
    // dom
    triggerDOM = wrapper.find('#trigger')
    expect(triggerDOM.exists()).toBeTruthy()
    // tooltipdom
    tooltipDOM = wrapper.find('.el-popper')
    expect(tooltipDOM.exists()).toBeFalsy()
  })

  test('打开事件测试', async () => {
    triggerDOM.trigger('click')
    await vi.runAllTimers()

    tooltipDOM = wrapper.find('.el-popper')
    expect(tooltipDOM.exists()).toBeTruthy()
    // tooltip内容
    expect(tooltipDOM.text()).toBe('tootip content')
    // 事件
    expect(onVisibleChange).toHaveBeenCalledWith(true)
  })

  test('关闭事件测试', async () => {
    triggerDOM.trigger('click')
    await vi.runAllTimers()
    tooltipDOM = wrapper.find('.el-popper')
    expect(tooltipDOM.exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })

  //   test('外部dom关闭事件测试', async () => {
  //     console.log(document.body.innerHTML)
  //     console.log(wrapper.html())
  //     outsideDOM.dispatchEvent(clickEvent)
  //     outsideDOM.dispatchEvent(clickEvent)
  //     // triggerDOM.trigger('click')
  //     await vi.runAllTimers()
  //     tooltipDOM = wrapper.find('.el-popper')
  //     console.log(wrapper.html())

  //     expect(tooltipDOM.exists()).toBeFalsy()
  //     // expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  //   })
})
