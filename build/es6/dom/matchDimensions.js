import { getMediaDimensions } from './getMediaDimensions';
export function matchDimensions(input, reference, useMediaDimensions) {
    if (useMediaDimensions === void 0) { useMediaDimensions = false; }
    var _a = useMediaDimensions
        ? getMediaDimensions(reference)
        : reference, width = _a.width, height = _a.height;
    input.width = width;
    input.height = height;
    return { width: width, height: height };
}
//# sourceMappingURL=matchDimensions.js.map