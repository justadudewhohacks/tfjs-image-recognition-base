export function getContext2dOrThrow(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('canvas 2d context is null')
  }
  return ctx
}