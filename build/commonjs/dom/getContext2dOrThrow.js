"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
var resolveInput_1 = require("./resolveInput");
function getContext2dOrThrow(canvasArg) {
    var _a = env_1.env.getEnv(), Canvas = _a.Canvas, CanvasRenderingContext2D = _a.CanvasRenderingContext2D;
    if (canvasArg instanceof CanvasRenderingContext2D) {
        return canvasArg;
    }
    var canvas = resolveInput_1.resolveInput(canvasArg);
    if (!(canvas instanceof Canvas)) {
        throw new Error('resolveContext2d - expected canvas to be of instance of Canvas');
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('resolveContext2d - canvas 2d context is null');
    }
    return ctx;
}
exports.getContext2dOrThrow = getContext2dOrThrow;
//# sourceMappingURL=getContext2dOrThrow.js.map