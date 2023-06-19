export function randomMusic(startNumber: number, endNumber: number) {
  return (
    Math.floor(
      Math.random() * (Math.max(startNumber, endNumber) - Math.min(startNumber, endNumber) + 1)
    ) + Math.min(startNumber, endNumber)
  )
}
