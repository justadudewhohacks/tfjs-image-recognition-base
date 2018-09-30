import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';
import { isMediaLoaded } from './isMediaLoaded';
export function createCanvas(_a) {
    var width = _a.width, height = _a.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
export function createCanvasFromMedia(media, dims) {
    if (!isMediaLoaded(media)) {
        throw new Error('createCanvasFromMedia - media has not finished loading yet');
    }
    var _a = dims || getMediaDimensions(media), width = _a.width, height = _a.height;
    var canvas = createCanvas({ width: width, height: height });
    getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
    return canvas;
}
//# sourceMappingURL=createCanvas.js.map