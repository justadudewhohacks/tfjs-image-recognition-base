"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tf = require("@tensorflow/tfjs-core");
var env_1 = require("../env");
var utils_1 = require("../utils");
function imageTensorToCanvas(imgTensor, canvas) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var targetCanvas, _a, height, width, numChannels, imgTensor3D;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    targetCanvas = canvas || env_1.env.getEnv().createCanvasElement();
                    _a = imgTensor.shape.slice(utils_1.isTensor4D(imgTensor) ? 1 : 0), height = _a[0], width = _a[1], numChannels = _a[2];
                    imgTensor3D = tf.tidy(function () { return imgTensor.as3D(height, width, numChannels).toInt(); });
                    return [4 /*yield*/, tf.browser.toPixels(imgTensor3D, targetCanvas)];
                case 1:
                    _b.sent();
                    imgTensor3D.dispose();
                    return [2 /*return*/, targetCanvas];
            }
        });
    });
}
exports.imageTensorToCanvas = imageTensorToCanvas;
//# sourceMappingURL=imageTensorToCanvas.js.map