import { Dimensions } from '../classes/Dimensions';
export function getMediaDimensions(input) {
    if (input instanceof HTMLImageElement) {
        return new Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof HTMLVideoElement) {
        return new Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions(input.width, input.height);
}
//# sourceMappingURL=getMediaDimensions.js.map