import { round } from '../utils';
import { drawBox } from './drawBox';
import { drawText } from './drawText';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getDefaultDrawOptions } from './getDefaultDrawOptions';
import { resolveInput } from './resolveInput';
export function drawDetection(canvasArg, detection, options) {
    var canvas = resolveInput(canvasArg);
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('drawBox - expected canvas to be of type: HTMLCanvasElement');
    }
    var detectionArray = Array.isArray(detection)
        ? detection
        : [detection];
    detectionArray.forEach(function (det) {
        var _a = det.getBox(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var drawOptions = getDefaultDrawOptions(options);
        var ctx = getContext2dOrThrow(canvas);
        drawBox(ctx, x, y, width, height, drawOptions);
        if (drawOptions.withScore) {
            drawText(ctx, x, y, det.className + " (" + round(det.score) + ")", drawOptions);
        }
    });
}
//# sourceMappingURL=drawDetection.js.map