export function isMediaLoaded(media) {
    return (media instanceof HTMLImageElement && media.complete)
        || (media instanceof HTMLVideoElement && media.readyState >= 3);
}
//# sourceMappingURL=isMediaLoaded.js.map