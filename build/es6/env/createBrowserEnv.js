export function createBrowserEnv() {
    var fetch = window['fetch'] || function () {
        throw new Error('fetch - missing fetch implementation for browser environment');
    };
    var readFile = function () {
        throw new Error('readFile - filesystem not available for browser environment');
    };
    return {
        Canvas: HTMLCanvasElement,
        CanvasRenderingContext2D: CanvasRenderingContext2D,
        Image: HTMLImageElement,
        ImageData: ImageData,
        Video: HTMLVideoElement,
        createCanvasElement: function () { return document.createElement('canvas'); },
        createImageElement: function () { return document.createElement('img'); },
        fetch: fetch,
        readFile: readFile
    };
}
//# sourceMappingURL=createBrowserEnv.js.map