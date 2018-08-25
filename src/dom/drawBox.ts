import { getDefaultDrawOptions } from './getDefaultDrawOptions';
import { DrawBoxOptions } from './types';

export function drawBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  options: DrawBoxOptions
) {
  const drawOptions = Object.assign(
    getDefaultDrawOptions(),
    (options || {})
  )

  ctx.strokeStyle = drawOptions.boxColor
  ctx.lineWidth = drawOptions.lineWidth
  ctx.strokeRect(x, y, w, h)
}