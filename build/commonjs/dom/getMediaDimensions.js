"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dimensions_1 = require("../classes/Dimensions");
function getMediaDimensions(input) {
    if (input instanceof HTMLImageElement) {
        return new Dimensions_1.Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof HTMLVideoElement) {
        return new Dimensions_1.Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions_1.Dimensions(input.width, input.height);
}
exports.getMediaDimensions = getMediaDimensions;
//# sourceMappingURL=getMediaDimensions.js.map