type hasValue = {
  value: unknown
}

export const getEventTargetValue = (event: Event) => {
  return (<hasValue | null>event.target)?.value
}
