export function randomFn(a: number, b: number): number {
  const MAX = Math.max(a, b)
  const MIN = Math.min(a, b)
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
}
