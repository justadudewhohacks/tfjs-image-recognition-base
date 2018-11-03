"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
function isMediaElement(input) {
    var _a = env_1.env.getEnv(), Image = _a.Image, Canvas = _a.Canvas, Video = _a.Video;
    return input instanceof Image
        || input instanceof Canvas
        || input instanceof Video;
}
exports.isMediaElement = isMediaElement;
//# sourceMappingURL=isMediaElement.js.map