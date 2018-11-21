export function isBrowser() {
    return typeof window === 'object'
        && typeof document !== 'undefined'
        && typeof HTMLImageElement !== 'undefined'
        && typeof HTMLCanvasElement !== 'undefined'
        && typeof HTMLVideoElement !== 'undefined'
        && typeof ImageData !== 'undefined';
}
//# sourceMappingURL=isBrowser.js.map