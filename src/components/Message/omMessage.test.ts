import { nextTick } from 'vue'
import { describe, expect, test } from 'vitest'
import { closeAll, createMessage } from '@/components/Message/method'

// transition 过程函数
const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

// js-dom 对应的height返回是0，只计算top
const getTopValue = (element: Element) => {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  test('调用方法应该创建对应的 Message 组件', async () => {
    const instance = createMessage({
      message: 'hello world11111',
      duration: 0
    })
    await rAF()
    console.log(document.body.innerHTML)
    expect(document.body.querySelector('.el-message')).toBeTruthy()
    instance.destory()
    await rAF()
    expect(document.body.querySelector('.el-message')).toBeFalsy()
  })

  test('多次调用创建多个组件', async () => {
    createMessage({
      message: 'hello world111',
      duration: 0
    })
    createMessage({
      message: 'hello world222',
      duration: 0
    })
    createMessage({
      message: 'hello world333',
      duration: 0
    })
    await rAF()

    const elements = document.body.querySelectorAll('.el-message')
    console.log(elements)
    expect(elements.length).toBe(3)
    closeAll()
    await rAF()
    expect(document.body.querySelector('.el-message')).toBeFalsy()
  })

  test('创建多个组件应该设置正确的offset', async () => {
    createMessage({
      message: 'hello world111',
      duration: 0,
      offset: 30
    })
    createMessage({
      message: 'hello world222',
      duration: 0,
      offset: 100
    })
    await rAF()
    const elements = document.body.querySelectorAll('.el-message')
    console.log(elements)
    expect(elements.length).toBe(2)
    const first = getTopValue(elements[0])
    const seconde = getTopValue(elements[1])
    console.log(first)
    console.log(seconde)
    expect(first).toBe(30)
    expect(seconde).toBe(130)
  })
})
