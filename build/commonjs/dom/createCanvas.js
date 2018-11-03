"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
var getContext2dOrThrow_1 = require("./getContext2dOrThrow");
var getMediaDimensions_1 = require("./getMediaDimensions");
var isMediaLoaded_1 = require("./isMediaLoaded");
function createCanvas(_a) {
    var width = _a.width, height = _a.height;
    var createCanvasElement = env_1.env.getEnv().createCanvasElement;
    var canvas = createCanvasElement();
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
exports.createCanvas = createCanvas;
function createCanvasFromMedia(media, dims) {
    var ImageData = env_1.env.getEnv().ImageData;
    if (!(media instanceof ImageData) && !isMediaLoaded_1.isMediaLoaded(media)) {
        throw new Error('createCanvasFromMedia - media has not finished loading yet');
    }
    var _a = dims || getMediaDimensions_1.getMediaDimensions(media), width = _a.width, height = _a.height;
    var canvas = createCanvas({ width: width, height: height });
    if (media instanceof ImageData) {
        getContext2dOrThrow_1.getContext2dOrThrow(canvas).putImageData(media, 0, 0);
    }
    else {
        getContext2dOrThrow_1.getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
    }
    return canvas;
}
exports.createCanvasFromMedia = createCanvasFromMedia;
//# sourceMappingURL=createCanvas.js.map