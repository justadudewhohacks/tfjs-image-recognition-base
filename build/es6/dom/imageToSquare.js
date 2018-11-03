import { env } from '../env';
import { createCanvas, createCanvasFromMedia } from './createCanvas';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';
export function imageToSquare(input, inputSize, centerImage) {
    if (centerImage === void 0) { centerImage = false; }
    var _a = env.getEnv(), Image = _a.Image, Canvas = _a.Canvas;
    if (!(input instanceof Image || input instanceof Canvas)) {
        throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
    }
    var dims = getMediaDimensions(input);
    var scale = inputSize / Math.max(dims.height, dims.width);
    var width = scale * dims.width;
    var height = scale * dims.height;
    var targetCanvas = createCanvas({ width: inputSize, height: inputSize });
    var inputCanvas = input instanceof Canvas ? input : createCanvasFromMedia(input);
    var offset = Math.abs(width - height) / 2;
    var dx = centerImage && width < height ? offset : 0;
    var dy = centerImage && height < width ? offset : 0;
    getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);
    return targetCanvas;
}
//# sourceMappingURL=imageToSquare.js.map