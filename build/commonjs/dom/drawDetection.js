"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var drawBox_1 = require("./drawBox");
var drawText_1 = require("./drawText");
var getContext2dOrThrow_1 = require("./getContext2dOrThrow");
var getDefaultDrawOptions_1 = require("./getDefaultDrawOptions");
var resolveInput_1 = require("./resolveInput");
function drawDetection(canvasArg, detection, options) {
    var canvas = resolveInput_1.resolveInput(canvasArg);
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('drawBox - expected canvas to be of type: HTMLCanvasElement');
    }
    var detectionArray = Array.isArray(detection)
        ? detection
        : [detection];
    detectionArray.forEach(function (det) {
        var _a = det.getBox(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var drawOptions = getDefaultDrawOptions_1.getDefaultDrawOptions(options);
        var ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvas);
        drawBox_1.drawBox(ctx, x, y, width, height, drawOptions);
        if (drawOptions.withScore) {
            drawText_1.drawText(ctx, x, y, det.className + " (" + utils_1.round(det.score) + ")", drawOptions);
        }
    });
}
exports.drawDetection = drawDetection;
//# sourceMappingURL=drawDetection.js.map