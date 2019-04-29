"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getMediaDimensions_1 = require("./getMediaDimensions");
function matchDimensions(input, reference, useMediaDimensions) {
    if (useMediaDimensions === void 0) { useMediaDimensions = false; }
    var _a = useMediaDimensions
        ? getMediaDimensions_1.getMediaDimensions(reference)
        : reference, width = _a.width, height = _a.height;
    input.width = width;
    input.height = height;
    return { width: width, height: height };
}
exports.matchDimensions = matchDimensions;
//# sourceMappingURL=matchDimensions.js.map