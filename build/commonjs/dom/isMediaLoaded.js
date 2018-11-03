"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
function isMediaLoaded(media) {
    var _a = env_1.env.getEnv(), Image = _a.Image, Video = _a.Video;
    return (media instanceof Image && media.complete)
        || (media instanceof Video && media.readyState >= 3);
}
exports.isMediaLoaded = isMediaLoaded;
//# sourceMappingURL=isMediaLoaded.js.map