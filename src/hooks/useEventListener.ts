import { isRef, watch, onMounted, onUnmounted, type Ref, unref } from 'vue'

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal!.removeEventListener(event, handler)
      val!.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onUnmounted(() => {
    unref(target)!.removeEventListener(event, handler)
  })
}
