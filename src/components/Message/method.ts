import type { CreateMessageProps, MessageInstance } from './types'
import MessageContructor from './omMessage.vue'
import { render, h, shallowReactive } from 'vue'
import useZIndex from '@/hooks/useZIndex'

let seed = 1
const instanceList: MessageInstance[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const dom = document.createElement('div')

  const onDestory = () => {
    const idx = instanceList.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instanceList.splice(idx, 1)
    render(null, dom)
  }

  const destory = () => {
    const instance = instanceList.find((instance) => instance.id === id)
    instance!.vm.exposed!.visible.value = false
  }

  const { nextZIndex } = useZIndex()
  const newProps = {
    ...props,
    onDestory,
    id,
    zIndex: nextZIndex()
  }
  const vNode = h(MessageContructor, newProps)
  render(vNode, dom)
  document.body.appendChild(dom)

  const instance: MessageInstance = {
    id,
    props: newProps,
    vNode,
    vm: vNode.component!,
    destory
  }
  instanceList.push(instance)

  return instance
}

export const getLastInstance = () => {
  return instanceList.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instanceList.findIndex((instance) => instance.id === id)
  console.log(id, idx)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instanceList[idx - 1]
    return prev?.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instanceList.forEach((instance) => {
    instance.destory()
  })
}
