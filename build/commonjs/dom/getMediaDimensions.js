"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMediaDimensions(input) {
    if (input instanceof HTMLImageElement) {
        return { width: input.naturalWidth, height: input.naturalHeight };
    }
    if (input instanceof HTMLVideoElement) {
        return { width: input.videoWidth, height: input.videoHeight };
    }
    return input;
}
exports.getMediaDimensions = getMediaDimensions;
//# sourceMappingURL=getMediaDimensions.js.map