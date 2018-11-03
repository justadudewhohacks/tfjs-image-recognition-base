import { BoxWithText } from '../classes/BoxWithText';
import { ObjectDetection } from '../classes/ObjectDetection';
import { PredictedBox } from '../classes/PredictedBox';
import { env } from '../env';
import { round } from '../utils';
import { drawBox } from './drawBox';
import { drawText } from './drawText';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getDefaultDrawOptions } from './getDefaultDrawOptions';
import { resolveInput } from './resolveInput';
export function drawDetection(canvasArg, detection, options) {
    var Canvas = env.getEnv().Canvas;
    var canvas = resolveInput(canvasArg);
    if (!(canvas instanceof Canvas)) {
        throw new Error('drawDetection - expected canvas to be of type: HTMLCanvasElement');
    }
    var detectionArray = Array.isArray(detection)
        ? detection
        : [detection];
    detectionArray.forEach(function (det) {
        var _a = det instanceof ObjectDetection ? det.box : det, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var drawOptions = getDefaultDrawOptions(options);
        var ctx = getContext2dOrThrow(canvas);
        drawBox(ctx, x, y, width, height, drawOptions);
        var withScore = drawOptions.withScore;
        var text = det instanceof BoxWithText
            ? det.text
            : ((withScore && det instanceof PredictedBox)
                ? "" + round(det.score)
                : (det instanceof ObjectDetection
                    ? "" + det.className + (withScore ? " (" + round(det.score) + ")" : '')
                    : ''));
        if (text) {
            drawText(ctx, x, y + height, text, drawOptions);
        }
    });
}
//# sourceMappingURL=drawDetection.js.map