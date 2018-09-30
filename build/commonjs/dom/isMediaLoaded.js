"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMediaLoaded(media) {
    return (media instanceof HTMLImageElement && media.complete)
        || (media instanceof HTMLVideoElement && media.readyState >= 3);
}
exports.isMediaLoaded = isMediaLoaded;
//# sourceMappingURL=isMediaLoaded.js.map