type CounterOption = {
  target?: HTMLElement
  startNumber: number
  endNumber: number
  duration: number
}

export const count = ({
  target,
  startNumber,
  endNumber,
  duration,
}: CounterOption) => {
  let startTimestamp: number | null = null
  const increase = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    if (target)
      target.innerText = String(
        Math.floor(progress * (endNumber - startNumber) + startNumber)
      )
    if (progress < 1) window.requestAnimationFrame(increase)
  }
  window.requestAnimationFrame(increase)
}
