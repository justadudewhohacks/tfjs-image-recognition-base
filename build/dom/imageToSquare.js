import { createCanvas, createCanvasFromMedia } from './createCanvas';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';
export function imageToSquare(input, inputSize) {
    if (!(input instanceof HTMLImageElement || input instanceof HTMLCanvasElement)) {
        throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
    }
    var dims = getMediaDimensions(input);
    var scale = inputSize / Math.max(dims.height, dims.width);
    var width = scale * dims.width;
    var height = scale * dims.height;
    var targetCanvas = createCanvas({ width: inputSize, height: inputSize });
    var inputCanvas = input instanceof HTMLCanvasElement ? input : createCanvasFromMedia(input);
    getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, 0, 0, width, height);
    return targetCanvas;
}
//# sourceMappingURL=imageToSquare.js.map