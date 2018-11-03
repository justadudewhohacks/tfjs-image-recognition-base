import { env } from '../env';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';
import { isMediaLoaded } from './isMediaLoaded';
export function createCanvas(_a) {
    var width = _a.width, height = _a.height;
    var createCanvasElement = env.getEnv().createCanvasElement;
    var canvas = createCanvasElement();
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
export function createCanvasFromMedia(media, dims) {
    var ImageData = env.getEnv().ImageData;
    if (!(media instanceof ImageData) && !isMediaLoaded(media)) {
        throw new Error('createCanvasFromMedia - media has not finished loading yet');
    }
    var _a = dims || getMediaDimensions(media), width = _a.width, height = _a.height;
    var canvas = createCanvas({ width: width, height: height });
    if (media instanceof ImageData) {
        getContext2dOrThrow(canvas).putImageData(media, 0, 0);
    }
    else {
        getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
    }
    return canvas;
}
//# sourceMappingURL=createCanvas.js.map