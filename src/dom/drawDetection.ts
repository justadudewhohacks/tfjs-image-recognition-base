import { ObjectDetection } from '../classes/ObjectDetection';
import { round } from '../utils';
import { drawBox } from './drawBox';
import { drawText } from './drawText';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getDefaultDrawOptions } from './getDefaultDrawOptions';
import { resolveInput } from './resolveInput';
import { DrawDetectionOptions } from './types';

export function drawDetection(
  canvasArg: string | HTMLCanvasElement,
  detection: ObjectDetection | ObjectDetection[],
  options?: DrawDetectionOptions
) {
  const canvas = resolveInput(canvasArg)
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('drawBox - expected canvas to be of type: HTMLCanvasElement')
  }

  const detectionArray = Array.isArray(detection)
    ? detection
    : [detection]

  detectionArray.forEach((det) => {
    const {
      x,
      y,
      width,
      height
    } = det.getBox()

    const drawOptions = getDefaultDrawOptions(options)

    const ctx = getContext2dOrThrow(canvas)
    drawBox(
      ctx,
      x,
      y,
      width,
      height,
      drawOptions
    )
    if (drawOptions.withScore) {
      drawText(
        ctx,
        x,
        y,
        `${det.className} (${round(det.score)})`,
        drawOptions
      )
    }
  })
}