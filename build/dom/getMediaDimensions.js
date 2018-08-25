export function getMediaDimensions(input) {
    if (input instanceof HTMLImageElement) {
        return { width: input.naturalWidth, height: input.naturalHeight };
    }
    if (input instanceof HTMLVideoElement) {
        return { width: input.videoWidth, height: input.videoHeight };
    }
    return input;
}
//# sourceMappingURL=getMediaDimensions.js.map