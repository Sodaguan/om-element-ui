import { onMounted, onUnmounted, type Ref } from 'vue'

const tooltipClickOutside = (
  elementRef: Ref<HTMLElement | undefined>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default tooltipClickOutside
