import { createCanvas, createCanvasFromMedia } from './createCanvas';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';
export function imageToSquare(input, inputSize, centerImage) {
    if (centerImage === void 0) { centerImage = false; }
    if (!(input instanceof HTMLImageElement || input instanceof HTMLCanvasElement)) {
        throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
    }
    var dims = getMediaDimensions(input);
    var scale = inputSize / Math.max(dims.height, dims.width);
    var width = scale * dims.width;
    var height = scale * dims.height;
    var targetCanvas = createCanvas({ width: inputSize, height: inputSize });
    var inputCanvas = input instanceof HTMLCanvasElement ? input : createCanvasFromMedia(input);
    var offset = Math.abs(width - height) / 2;
    var dx = centerImage && width < height ? offset : 0;
    var dy = centerImage && height < width ? offset : 0;
    getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);
    return targetCanvas;
}
//# sourceMappingURL=imageToSquare.js.map