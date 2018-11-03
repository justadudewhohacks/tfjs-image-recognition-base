"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoxWithText_1 = require("../classes/BoxWithText");
var ObjectDetection_1 = require("../classes/ObjectDetection");
var PredictedBox_1 = require("../classes/PredictedBox");
var env_1 = require("../env");
var utils_1 = require("../utils");
var drawBox_1 = require("./drawBox");
var drawText_1 = require("./drawText");
var getContext2dOrThrow_1 = require("./getContext2dOrThrow");
var getDefaultDrawOptions_1 = require("./getDefaultDrawOptions");
var resolveInput_1 = require("./resolveInput");
function drawDetection(canvasArg, detection, options) {
    var Canvas = env_1.env.getEnv().Canvas;
    var canvas = resolveInput_1.resolveInput(canvasArg);
    if (!(canvas instanceof Canvas)) {
        throw new Error('drawDetection - expected canvas to be of type: HTMLCanvasElement');
    }
    var detectionArray = Array.isArray(detection)
        ? detection
        : [detection];
    detectionArray.forEach(function (det) {
        var _a = det instanceof ObjectDetection_1.ObjectDetection ? det.box : det, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var drawOptions = getDefaultDrawOptions_1.getDefaultDrawOptions(options);
        var ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvas);
        drawBox_1.drawBox(ctx, x, y, width, height, drawOptions);
        var withScore = drawOptions.withScore;
        var text = det instanceof BoxWithText_1.BoxWithText
            ? det.text
            : ((withScore && det instanceof PredictedBox_1.PredictedBox)
                ? "" + utils_1.round(det.score)
                : (det instanceof ObjectDetection_1.ObjectDetection
                    ? "" + det.className + (withScore ? " (" + utils_1.round(det.score) + ")" : '')
                    : ''));
        if (text) {
            drawText_1.drawText(ctx, x, y + height, text, drawOptions);
        }
    });
}
exports.drawDetection = drawDetection;
//# sourceMappingURL=drawDetection.js.map