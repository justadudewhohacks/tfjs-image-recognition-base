"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
var createCanvas_1 = require("./createCanvas");
var getContext2dOrThrow_1 = require("./getContext2dOrThrow");
var getMediaDimensions_1 = require("./getMediaDimensions");
function imageToSquare(input, inputSize, centerImage) {
    if (centerImage === void 0) { centerImage = false; }
    var _a = env_1.env.getEnv(), Image = _a.Image, Canvas = _a.Canvas;
    if (!(input instanceof Image || input instanceof Canvas)) {
        throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
    }
    var dims = getMediaDimensions_1.getMediaDimensions(input);
    var scale = inputSize / Math.max(dims.height, dims.width);
    var width = scale * dims.width;
    var height = scale * dims.height;
    var targetCanvas = createCanvas_1.createCanvas({ width: inputSize, height: inputSize });
    var inputCanvas = input instanceof Canvas ? input : createCanvas_1.createCanvasFromMedia(input);
    var offset = Math.abs(width - height) / 2;
    var dx = centerImage && width < height ? offset : 0;
    var dy = centerImage && height < width ? offset : 0;
    getContext2dOrThrow_1.getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);
    return targetCanvas;
}
exports.imageToSquare = imageToSquare;
//# sourceMappingURL=imageToSquare.js.map