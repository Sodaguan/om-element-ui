import type { CreateMessageProps, MessageInstance } from './types'
import MessageContructor from './omMessage.vue'
import { render, h } from 'vue'

let seed = 1
const instanceList: MessageInstance[] = []
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const dom = document.createElement('div')

  const onDestory = () => {
    const idx = instanceList.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instanceList.splice(idx, 1)
    render(null, dom)
  }

  const newProps = {
    ...props,
    onDestory,
    id
  }
  const vNode = h(MessageContructor, newProps)
  render(vNode, dom)
  document.body.appendChild(dom)

  const instance: MessageInstance = {
    id,
    props: newProps,
    vNode,
    vm: vNode.component!
  }
  instanceList.push(instance)

  return instanceList
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
    const prev = instanceList.at(idx - 1)
    return prev?.vm.exposed!.bottomOffset.value
  }
}
