import { BoxWithText } from '../classes/BoxWithText';
import { ObjectDetection } from '../classes/ObjectDetection';
import { PredictedBox } from '../classes/PredictedBox';
import { Rect } from '../classes/Rect';
import { env } from '../env';
import { round } from '../utils';
import { drawBox } from './drawBox';
import { drawText } from './drawText';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getDefaultDrawOptions } from './getDefaultDrawOptions';
import { resolveInput } from './resolveInput';
import { DrawDetectionOptions } from './types';

export function drawDetection(
  canvasArg: string | HTMLCanvasElement,
  detection: Rect | PredictedBox | ObjectDetection | BoxWithText | Array<Rect | PredictedBox | ObjectDetection | BoxWithText>,
  options?: DrawDetectionOptions
) {

  const { Canvas } = env.getEnv()

  const canvas = resolveInput(canvasArg)
  if (!(canvas instanceof Canvas)) {
    throw new Error('drawDetection - expected canvas to be of type: HTMLCanvasElement')
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
    } = det instanceof ObjectDetection ? det.box : det

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

    const { withScore } = drawOptions
    let text = det instanceof BoxWithText
      ? det.text
      : ((withScore && det instanceof PredictedBox)
        ? `${round(det.score)}`
        : (det instanceof ObjectDetection
          ? `${det.className}${withScore ? ` (${round(det.score)})` : ''}`
          : ''
        )
      )

    if (text) {
      drawText(ctx, x, y + height, text, drawOptions)
    }
  })
}