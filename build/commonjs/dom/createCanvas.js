"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getContext2dOrThrow_1 = require("./getContext2dOrThrow");
var getMediaDimensions_1 = require("./getMediaDimensions");
var isMediaLoaded_1 = require("./isMediaLoaded");
function createCanvas(_a) {
    var width = _a.width, height = _a.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
exports.createCanvas = createCanvas;
function createCanvasFromMedia(media, dims) {
    if (!isMediaLoaded_1.isMediaLoaded(media)) {
        throw new Error('createCanvasFromMedia - media has not finished loading yet');
    }
    var _a = dims || getMediaDimensions_1.getMediaDimensions(media), width = _a.width, height = _a.height;
    var canvas = createCanvas({ width: width, height: height });
    getContext2dOrThrow_1.getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
    return canvas;
}
exports.createCanvasFromMedia = createCanvasFromMedia;
//# sourceMappingURL=createCanvas.js.map