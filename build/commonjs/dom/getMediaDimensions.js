"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dimensions_1 = require("../classes/Dimensions");
var env_1 = require("../env");
function getMediaDimensions(input) {
    var _a = env_1.env.getEnv(), Image = _a.Image, Video = _a.Video;
    if (input instanceof Image) {
        return new Dimensions_1.Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof Video) {
        return new Dimensions_1.Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions_1.Dimensions(input.width, input.height);
}
exports.getMediaDimensions = getMediaDimensions;
//# sourceMappingURL=getMediaDimensions.js.map