import { getDefaultDrawOptions } from './getDefaultDrawOptions';
import { DrawTextOptions } from './types';

export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  options: DrawTextOptions = {}
) {
  const drawOptions = Object.assign(
    getDefaultDrawOptions(),
    options
  )

  const padText = 2 + drawOptions.lineWidth

  ctx.fillStyle = drawOptions.textColor
  ctx.font = `${drawOptions.fontSize}px ${drawOptions.fontStyle}`
  ctx.fillText(text, x + padText, y + padText + (drawOptions.fontSize * 0.6))
}
